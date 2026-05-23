using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.entities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context) : BaseApiController
{
    [HttpPost("register")] // api/account/register
    public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
    {
        if(await EmailExists(registerDto.Email)) return BadRequest("Email is already in use");
        
        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            Email = registerDto.Email,
            UserName = registerDto.DisplayName,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user);

        await context.SaveChangesAsync();

        return Ok(user);
    }

    public async Task<Boolean> EmailExists( string email)
    {
        return await context.Users.AnyAsync(x => x.Email.ToLower()== email.ToLower());
    }
}