using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Snail",
                    Email = "snail@snailmail.com",
                    UserName = "snail@snailmail.com",
                    Address = new Address
                    {
                        FirstName = "Snail",
                        LastName = "Smith",
                        Street = "12 Crawler Street",
                        City = "Snail City",
                        ZipCode = "90210",                       
                    }
                };
                await userManager.CreateAsync(user, "123");
            }
        }

        public static Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            throw new NotImplementedException();
        }
    }
}