using System;

namespace Core.Interfaces
{

    public interface IResponseCacheService
    {
        Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive);
        Task<string> getCacheResponseAsync(string cacheKey);
    }
}