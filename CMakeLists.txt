cmake_minimum_required(VERSION 2.8)

# Default to release build if not specified
if(NOT CMAKE_BUILD_TYPE)
	set(CMAKE_BUILD_TYPE "Release" CACHE STRING "Choose the type of build, options are: Debug Release RelWithDebInfo MinSizeRel." FORCE)
endif()

project(webgl_render_test)

if (EMSCRIPTEN)
	set(CMAKE_EXECUTABLE_SUFFIX ".html")

	set(CMAKE_EXE_LINKER_FLAGS "--js-library ${CMAKE_CURRENT_LIST_DIR}/src/library_js.js -s WASM=0 --separate-asm --closure 1 -s TEXTDECODER=2 -s MINIMAL_RUNTIME=1 -s ABORTING_MALLOC=0 -s ENVIRONMENT=web -s GL_SUPPORT_AUTOMATIC_ENABLE_EXTENSIONS=0 -s GL_EXTENSIONS_IN_PREFIXED_FORMAT=0 -s GL_POOL_TEMP_BUFFERS=0 -s AGGRESSIVE_VARIABLE_ELIMINATION=1 -s ELIMINATE_DUPLICATE_FUNCTIONS=1 --emit-symbol-map -s DISABLE_DEPRECATED_FIND_EVENT_TARGET_BEHAVIOR=1 -s FILESYSTEM=0 -s SUPPORT_ERRNO=0 -s GL_TRACK_ERRORS=0 -lGL")
endif()

file(GLOB_RECURSE sources src/*)
add_executable(webgl_render_test ${sources})

file(GLOB_RECURSE assets assets/*)
foreach(asset ${assets})
	file(COPY "${asset}" DESTINATION "${CMAKE_CURRENT_BINARY_DIR}/")
endforeach()