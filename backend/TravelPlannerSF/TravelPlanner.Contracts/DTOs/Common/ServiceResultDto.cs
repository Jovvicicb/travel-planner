namespace TravelPlanner.Contracts.DTOs.Common
{
    public class ServiceResultDto<T>
    {
        public bool Success { get; set; }

        public int StatusCode { get; set; }

        public string Message { get; set; } = string.Empty;

        public T? Data { get; set; }

        public static ServiceResultDto<T> Ok(T data, string message = "Operation successful.")
        {
            return new ServiceResultDto<T>
            {
                Success = true,
                StatusCode = 200,
                Message = message,
                Data = data
            };
        }

        public static ServiceResultDto<T> Created(T data, string message = "Resource created successfully.")
        {
            return new ServiceResultDto<T>
            {
                Success = true,
                StatusCode = 201,
                Message = message,
                Data = data
            };
        }

        public static ServiceResultDto<T> Fail(string message, int statusCode = 400)
        {
            return new ServiceResultDto<T>
            {
                Success = false,
                StatusCode = statusCode,
                Message = message
            };
        }
    }

    public class ServiceResultDto
    {
        public bool Success { get; set; }

        public int StatusCode { get; set; }

        public string Message { get; set; } = string.Empty;

        public static ServiceResultDto Ok(string message = "Operation successful.")
        {
            return new ServiceResultDto
            {
                Success = true,
                StatusCode = 200,
                Message = message
            };
        }

        public static ServiceResultDto Created(string message = "Resource created successfully.")
        {
            return new ServiceResultDto
            {
                Success = true,
                StatusCode = 201,
                Message = message
            };
        }

        public static ServiceResultDto Fail(string message, int statusCode = 400)
        {
            return new ServiceResultDto
            {
                Success = false,
                StatusCode = statusCode,
                Message = message
            };
        }
    }
}