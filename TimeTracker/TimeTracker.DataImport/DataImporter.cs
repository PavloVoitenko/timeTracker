using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using TimeTracker.DataImport.Models;
using TimeTracker.Model.Entities;

namespace TimeTracker.DataImport
{
    class DataImporter
    {
        #region Constants

        private const char DateSplitter = ':';

        private static readonly IEnumerable<string> DevNames = new[] { "dev", "ref" };
        private static readonly IEnumerable<string> MeetingNames = new[] { "standup", "meet", "demo", "all hands", "interview" };
        private static readonly IEnumerable<string> DesignNames = new[] { "des" };
        private static readonly IEnumerable<string> OperationsNames = new[] { "package", "build" };
        private static readonly IEnumerable<string> TestingNames = new[] { "tst" };

        private static readonly IDictionary<TaskType, IEnumerable<string>> TaskTypeNames = new Dictionary<TaskType, IEnumerable<string>>
        {
            { TaskType.Development, DevNames }, { TaskType.Meeting, MeetingNames }, { TaskType.Design, DesignNames },
            { TaskType.DevOperations, OperationsNames }, { TaskType.Testing, TestingNames }
        };

        private static readonly string ContentRegex = @$"(?<{ContentGroup.Name}>\D*)\s*(?<{ContentGroup.Number}>\d{{4,6}})?\s*(?<{ContentGroup.Times}>(?<{ContentGroup.StartTime}>\d?\d:\d\d)\s*-\s*(?<{ContentGroup.EndTime}>\d?\d:\d\d))?\s*(?<{ContentGroup.Duration}>\d\.?\d{{0,2}})?\s*(?<{ContentGroup.Description}>\w*)";

        #endregion

        private string _filePath;
        
        private string _user;
        private string _project;

        private int _year;

        private DataCreator _creator;
        private CultureInfo culture = new CultureInfo("en-gb");

        public DataImporter(string filePath)
        {
            _filePath = filePath;

            var fileNameParts = Path.GetFileName(filePath).Split(new char[] { '_', '.' });
            (_user, _project, _year) = (fileNameParts[0], fileNameParts[1], int.Parse(fileNameParts[2]));

            _creator = new DataCreator(_user, _project);
        }

        public void Import()
        {
            var lines = GetLines();

            foreach (var line in lines)
            {
                try
                {
                    _creator.Create(line);
                }
                catch (Exception)
                {
                    throw new FormatException($"Line on {line.Date} could not be saved");
                }
            }
        }

        private IEnumerable<ExportLine> GetLines()
        {
            var result = new List<ExportLine>();
            using var file = new StreamReader(_filePath);
            var line = file.ReadLine();

            do
            {
                var exportLine = GetLine(line);
                if (exportLine != null)
                {
                    result.Add(exportLine);
                }

                line = file.ReadLine();
            } while (!string.IsNullOrEmpty(line));

            return result;
        }

        private ExportLine GetLine(string line)
        {
            var parts = line.Split(DateSplitter, 2);

            if (parts.Length != 2)
            {
                throw new FormatException("File has incorrect format");
            }

            var currentLine = CreateLine(parts[0]);
            var result = Regex.Match(parts[1], ContentRegex);

            foreach (Group group in result.Groups)
            {
                if (!string.IsNullOrWhiteSpace(group.Value))
                {
                    ProcessPart(currentLine, group.Name, group.Value);
                }
            }

            if (currentLine.Valid)
            {
                return currentLine;
            }
            else
            {
                Console.WriteLine($"Line is incomplete: {line}");
                return null;
            }
        }

        private ExportLine CreateLine(string datePart)
        {
            if (DateTime.TryParse(datePart.Replace('.', '/'), culture.DateTimeFormat, DateTimeStyles.None, out var dateTime))
            {
                var date = new DateTime(_year, dateTime.Month, dateTime.Day);
                return new ExportLine(date);
            }

            throw new FormatException($"Date could not be parsed: '{datePart}'");
        }

        private void ProcessPart(ExportLine line, string name, string value)
        {
            switch (name)
            {
                case ContentGroup.Name:
                    line.TaskName = value;
                    line.TaskType = ResolveTypeFromName(value.ToLower());
                    break;
                case ContentGroup.Number:
                    line.TaskNumber = value;
                    break;
                case ContentGroup.Times:
                    break;
                case ContentGroup.StartTime:
                    line.StartTime = TimeSpan.Parse(value);
                    break;
                case ContentGroup.EndTime:
                    line.EndTime = TimeSpan.Parse(value);
                    break;
                case ContentGroup.Duration:
                    var number = (int)(double.Parse(value) * 60);
                    line.Duration = new TimeSpan(number / 60, number % 60, 0); 
                    break;
                case ContentGroup.Description:
                    line.Description = value;
                    break;
                case "0":
                    break;
                default:
                    throw new FormatException("Content could not be parsed");
            }
        }

        private TaskType ResolveTypeFromName(string name)
        {
            var result = TaskType.Unknown;

            foreach (var pair in TaskTypeNames)
            {
                if (pair.Value.Any(n => name.Contains(n)))
                {
                    result = pair.Key;
                    break;
                }
            }

            return result;
        }

        protected static class ContentGroup
        {
            public const string Name = "name";
            public const string Number = "number";
            public const string Times = "times";
            public const string StartTime = "startTime";
            public const string EndTime = "endTime";
            public const string Duration = "duration";
            public const string Description = "description";
        }
    }

    
}
