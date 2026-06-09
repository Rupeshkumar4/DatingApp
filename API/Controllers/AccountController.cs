using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using API.DTOs;
using API.Extensions;

namespace API.Controllers;

public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")] // api/account/register
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if(await EmailExists(registerDto.Email)) return BadRequest("Email is already in use");
        
        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            Email = registerDto.Email,
            DisplayName = registerDto.DisplayName,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user);

        await context.SaveChangesAsync();

        var userDto = user.ToDto(tokenService);

        return Ok(userDto);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        // if(await EmailExists(loginDto.Email)) return BadRequest("Email is already in use"); THIS is not needed for us because we are not taking dublicate emails while registration
        var user = await context.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);
        if (user == null) return BadRequest("Email is not valid");

        using var hmac = new HMACSHA512(user.PasswordSalt); // Creates reverse hashing algorithm.
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password)); // This converts login input into bytes and creates hash.

        for(var i =0; i < computedHash.Length; i++)
        {
            if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
        }
        var userDto = user.ToDto(tokenService);
        return Ok(userDto);
    }

    public async Task<Boolean> EmailExists( string email)
    {
        return await context.Users.AnyAsync(x => x.Email.ToLower()== email.ToLower());
    }

}