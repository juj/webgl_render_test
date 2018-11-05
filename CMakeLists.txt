cmake_minimum_required(VERSION 2.8)

# Default to release build if not specified
if(NOT CMAKE_BUILD_TYPE)
	set(CMAKE_BUILD_TYPE "Release" CACHE STRING "Choose the type of build, options are: Debug Release RelWithDebInfo MinSizeRel." FORCE)
endif()

project(webgl_render_test)

if (EMSCRIPTEN)
	set(CMAKE_EXECUTABLE_SUFFIX ".html")
	set(CMAKE_EXE_LINKER_FLAGS "--shell-file ${CMAKE_CURRENT_LIST_DIR}/src/shell.html --js-library ${CMAKE_CURRENT_LIST_DIR}/src/library_js.js")
endif()

file(GLOB_RECURSE sources src/*)
add_executable(webgl_render_test ${sources})

file(GLOB_RECURSE assets assets/*)
foreach(asset ${assets})
	file(COPY "${asset}" DESTINATION "${CMAKE_CURRENT_BINARY_DIR}/")
endforeach()