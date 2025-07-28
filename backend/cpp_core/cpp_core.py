import ctypes
import os
import platform

class PokerCore:
    def __init__(self):
        # Load the compiled C++ library
        lib_path = self._find_library()
        self.lib = ctypes.CDLL(lib_path)
        
        # Define function prototypes
        self.lib.solve_gto.restype = ctypes.c_char_p
        self.lib.solve_gto.argtypes = [
            ctypes.c_char_p,  # player_range
            ctypes.c_char_p,  # opponent_range
            ctypes.c_char_p,  # board
            ctypes.c_char_p,  # game_type
            ctypes.POINTER(ctypes.c_double),  # stacks
            ctypes.c_int,     # stacks_len
            ctypes.POINTER(ctypes.c_double),  # prizes
            ctypes.c_int      # prizes_len
        ]

    def solve(self, hero_range, villain_range, board, game_type, stacks, prizes, config):
        # Convert inputs to C-compatible types
        stacks_arr = (ctypes.c_double * len(stacks))(*stacks)
        prizes_arr = (ctypes.c_double * len(prizes))(*prizes)
        
        # Call C++ function
        result_json = self.lib.solve_gto(
            hero_range.encode('utf-8'),
            villain_range.encode('utf-8'),
            board.encode('utf-8'),
            game_type.encode('utf-8'),
            stacks_arr,
            len(stacks),
            prizes_arr,
            len(prizes)
        )
        
        return json.loads(ctypes.string_at(result_json).decode('utf-8'))

    def _find_library(self):
        # Platform-specific library names
        libnames = {
            'Windows': 'poker_core.dll',
            'Linux': 'libpoker_core.so',
            'Darwin': 'libpoker_core.dylib'
        }
        libname = libnames.get(platform.system())
        
        # Search paths: same dir, then ../cpp_core/build/
        search_paths = [
            os.path.dirname(__file__),
            os.path.join(os.path.dirname(__file__), '../../cpp_core/build')
        ]
        
        for path in search_paths:
            full_path = os.path.join(path, libname)
            if os.path.exists(full_path):
                return full_path
                
        raise ImportError(f"Could not find C++ core library {libname}")