cmake_minimum_required(VERSION 3.12)
project(poker_core)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/../python/core)

# For Python bindings
find_package(pybind11 REQUIRED)

add_library(poker_core SHARED
    src/solver.cpp
    src/range.cpp
    src/equity.cpp
)

target_link_libraries(poker_core PRIVATE pybind11::module)

# Platform-specific settings
if(WIN32)
    set_target_properties(poker_core PROPERTIES SUFFIX ".dll")
elseif(APPLE)
    set_target_properties(poker_core PROPERTIES SUFFIX ".dylib")
else()
    set_target_properties(poker_core PROPERTIES SUFFIX ".so")
endif()