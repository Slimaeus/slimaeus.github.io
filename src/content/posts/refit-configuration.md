---
title: Configure Refit
published: 2025-06-23
description: How I configure Refit
tags: [csharp, dotnet, api]
category: Guides
draft: false 
lang: en
---
1. Install `Refit`
    ```bash
    dotnet add package Refit
    dotnet add package Refit.HttpClientFactory
    ```
1. Create interface
    ```csharp title="IGithubApi.cs" collapse={6-14} 
    public interface IGithubApi
    {
        [Get("/users/{userName}")]
        Task<User?> GetUserAsync(string username, CancellationToken cancellationToken = default);
    }
    public class User
    {
        [JsonPropertyName("id")]
        public long Id { get; set; }
        [JsonPropertyName("login")]
        public string Login { get; set; } = string.Empty;
        [JsonPropertyName("avatar_url")]
        public string AvatarUrl { get; set; } = string.Empty;
    }
    ```
1. Configure refit client
    ```csharp title="Program.cs"
    builder.Services
        .AddRefitClient<IGithubApi>()
        .ConfigureHttpClient(c =>
        {
            c.BaseAddress = new Uri("https://api.github.com");
            c.DefaultRequestHeaders.UserAgent.TryParseAdd("request");
        });
    ```
1. Map endpoint
    ```csharp title="Program.cs"
    app.MapGet("github/{userName}", async (
        IGithubApi githubApi,
        [FromRoute] string userName,
        CancellationToken cancellationToken) =>
    {
        var response = await githubApi.GetUserAsync(userName, cancellationToken);
        return Results.Ok(response);
    });
    ```
---
> ### References
> - [Refit nuget package](https://www.nuget.org/packages/Refit/)