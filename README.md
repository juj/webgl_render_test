# webgl_render_test
Small example of WebGL rendering with Emscripten &amp; WebAssembly

# Build instructions

Run in terminal:

```bash
cd ~
git clone https://github.com/juj/emsdk.git
cd emsdk
./emsdk install sdk-incoming-64bit
./emsdk activate sdk-incoming-64bit
source ./emsdk_env.sh

# This sample needs the branch juj/november_2018 to work
cd emscripten/incoming
git remote add juj https://github.com/juj/emscripten.git
git fetch juj
git checkout november_2018

cd ~
git clone https://github.com/juj/webgl_render_test.git
cd webgl_render_test
mkdir build
cd build
emcmake cmake ..
cmake --build .
# Now should have produced webgl_render_test.html you can open in Firefox
# For Chrome, run `python SimpleHTTPServer`, or `emrun --no_browser .` to host an ad hoc web server in current working directory,
# then navigate to `http://localhost:8000/` or `http://localhost:6931/`
