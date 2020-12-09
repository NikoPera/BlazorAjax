# BlazorAjax
blazor server fix to work with ASP.NET Core MVC AJAX

After blazor.server.js is started, new component added with Ajax won't get discovered and parsed.
This repository adds the following functions to the global Blazor object:
- stop: 
with Blazor.start() you start Blazor and initialize component. If you navigate to other pages using Ajax (so you don't reload the page) and want to initialize other component, you can call Blazor.stop() and then again Blazor.start() (stop function is implicitly called on each call to Blazor.start())

calling stop destroy all binds to old components and reset the connection! 
If you want to initialize new component, but mantain binds on the old one check the "discoverNewComponent" function

- discoverNewComponent TODO
