# BlazorAjax
blazor server fix to work with ASP.NET Core MVC AJAX

After Blazor is started (by includind the script _framework/blazor.webassembly.js or explicitly calling Blazor.start() if you set attribute autostart=false), new components added with Ajax won't get discovered and parsed.
This repository adds the following functions to the global Blazor object:
- stop: 
Blazor.stop() resets Blazor circuit, connection, components and event listeners so that is ready for the next round; stop function is implicitly called on each call to Blazor.start(), so you just have to worry about calling Blazor.start() on each page where you have Blazor components.

WARNING: calling stop destroy old components! If you want to initialize new components, but mantain the old ones check the "discoverNewComponents" function

- discoverNewComponents
canceled due to complexity
