# Unity WebGL

To run in WebGL, all code needs to be JavaScript. We use the emscripten compiler toolchain to cross-compile the Unity runtime code (written in C and C++) into asm.js JavaScript. asm.js is a very optimizable subset of JavaScript which allows JavaScript engines to AOT-compile asm.js code into very efficient native code.

To convert the .NET game code (your C# scripts) into JavaScript, we use a technology called IL2CPP
. IL2CPP takes .NET bytecode and converts it to corresponding C++ source files, which is then compiled using emscripten to convert your scripts
 to JavaScript.

 [AOT VS JIT](https://blog.csdn.net/h1130189083/article/details/78302502)

 [Building and running a WebGL project](https://docs.unity3d.com/Manual/webgl-building.html)

 [Debugging and troubleshooting WebGL builds](https://docs.unity3d.com/Manual/webgl-debugging.html)

 [内存控制](https://docs.unity3d.com/Manual/webgl-memory.html)

 [unity 与 html 通信](https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html)