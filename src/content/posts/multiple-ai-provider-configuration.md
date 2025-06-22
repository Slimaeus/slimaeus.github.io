---
title: Configure multiple AI providers
published: 2025-06-21
description: How I configure  multiple AI providers (Gemini, Mistral, Ollama...)
tags: [C#, .NET, Api]
category: Tips
draft: false 
lang: en
---
## 1. Define providers in `appsettings.json`/`appsettings.*.json`
```json title="appsettings.*.json"
{
  "ProviderSettings": {
    "Gemini": {
      "Endpoint": "https://generativelanguage.googleapis.com/v1beta",
      "ApiKey": "",
      "DefaultModel": "gemini-2.0-flash-exp"
    },
    "Mistral": {
      "Endpoint": "https://api.mistral.ai/v1",
      "ApiKey": "",
      "DefaultModel": "mistral-large-2407"
    },
    "OpenRouter": {
      "Endpoint": "https://openrouter.ai/api/v1",
      "ApiKey": "",
      "DefaultModel": "google/gemini-2.0-pro-exp-02-05:free"
    },
    "Ollama": {
      "Endpoint": "http://127.0.0.1:11434/v1",
      "ApiKey": "",
      "DefaultModel": "command-r7b"
    }
  }
}
```
---
## 2. Create config classes
```csharp title="ProviderConfiguration.cs"
public class ProviderConfiguration
{
    public string Endpoint { get; set; } = string.Empty;
    public string ApiKey { get; set; } = string.Empty;
    public string DefaultModel { get; set; } = string.Empty;
}
```
```csharp title="ProviderSettings.cs"
public class ProviderSettings
{
    public ProviderConfiguration Gemini { get; set; } = default!;
    public ProviderConfiguration Mistral { get; set; } = default!;
    public ProviderConfiguration OpenRouter { get; set; } = default!;
    public ProviderConfiguration Ollama { get; set; } = default!;
}
```
---
## 3. Register config in `Program.cs`
```csharp
builder.Services.Configure<ProviderSettings>(
    builder.Configuration.GetSection(nameof(ProviderSettings)));
```
---
## 4. Install `OpenAI` package
```bash
dotnet add package OpenAI
```
---
## 5. Use in endpoint
```csharp {6}
app.MapGet("", async (
    IOptions<ProviderSettings> options,
    string prompt,
    CancellationToken cancellationToken) =>
{
    var provider = options.Value.Gemini;

    var client = new ChatClient(
        provider.DefaultModel,
        new ApiKeyCredential(provider.ApiKey),
        new OpenAIClientOptions { Endpoint = new Uri(provider.Endpoint) }
    );

    var result = await client.CompleteChatAsync([prompt], cancellationToken);
    return Results.Ok(result.Value.Content);
});
```
:::note
You can switch to other providers like `options.Value.Mistral`, `Ollama`, etc.
:::
> ### References
> - [OpenAI nuget package](https://www.nuget.org/packages/OpenAI/)