import unittest
from core.solver import PokerSolver

class TestPokerSolver(unittest.TestCase):
    def setUp(self):
        self.solver = PokerSolver()
    
    def test_range_parsing(self):
        test_cases = [
            ("AA", ["AsAh", "AsAd", "AsAc", ...]),
            ("AKs", ["AsKs", "AhKh", ...]),
            ("22+", ["2s2h", "2s2d", ..., "AsAh"]),
            ("random", 1326)  # Total combos
        ]
        
        for range_str, expected in test_cases:
            result = self.solver._parse_range(range_str)
            if isinstance(expected, int):
                self.assertEqual(len(result), expected)
            else:
                self.assertCountEqual(result, expected)

    def test_gto_solution(self):
        result = self.solver.solve_gto(
            player_range="AA,KK",
            opponent_range="random",
            board="AsKhQd"
        )
        self.assertIn('strategy', result)
        self.assertIn('equity', result)
        self.assertGreater(result.equity['hero'], 50)  # AA/KK should have >50% equity