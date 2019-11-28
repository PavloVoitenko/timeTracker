using System;
using System.IO;
using System.Text;

namespace TimeTracker.DataImport
{
    class Program
    {
        public const string DateRegEx = @"[0-9]{2}/[0-9]{2}";

        public static void Main(string[] args)
        {
            ImportData(args);
        }

        public static void ExtractFromEvernoteHtml()
        {
            var extractor = new DataExtractor(File.ReadAllText("Env.html"));

            var resultFile = File.Create("resultFile.txt");

            foreach (var line in extractor.Lines())
            {
                resultFile.Write(Encoding.UTF8.GetBytes(line));
            }

            resultFile.Close();
        }

        public static void ImportData(string[] fileNames)
        {
            foreach (var fileName in fileNames)
            {
                try
                {
                    var importer = new DataImporter(fileName);
                    importer.Import();
                }
                catch (Exception e)
                {
                    Console.WriteLine($"File '{fileName}' could not be parsed. Exception: {e.Message}");
                }

            }
        }
    }
}
