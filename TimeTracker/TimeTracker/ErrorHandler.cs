using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;
using TimeTracker.Exceptions;

namespace TimeTracker
{
    public class ErrorHandler
    {
        private readonly RequestDelegate _next;

        public ErrorHandler(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (FunctionalException e)
            {
                var errorDto = new DTOs.ErrorDto
                {
                    Message = e.Message,
                    StatusCode = StatusCodes.Status500InternalServerError
                };
                var responseBytes = JsonConvert.SerializeObject(errorDto, Formatting.Indented).Select(c => Convert.ToByte(c)).ToArray();

                await context.Response.BodyWriter.WriteAsync(responseBytes.AsMemory());
            }
        }
    }
}