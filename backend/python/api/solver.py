def _parse_range(self, range_str: str) -> List[str]:
    """Convert poker range notation to individual combos"""
    if range_str.lower() == "random":
        return self._generate_all_combos()

    combos = []
    for part in range_str.split(","):
        part = part.strip()
        if "+" in part:  # Range like 22+
            combos.extend(self._expand_range(part))
        elif "s" in part:  # Suited
            combos.extend(self._expand_suited(part))
        elif "o" in part:  # Offsuit
            combos.extend(self._expand_offsuit(part))
        else:  # Specific hand
            combos.append(self._normalize_hand(part))
    return list(set(combos))  # Remove duplicates


def _expand_range(self, range_str):
    # Implement 22+ → 22,33,...,AA
    pass


def _expand_suited(self, hand_str):
    # Implement AKs → A♠K♠, A♥K♥, etc.
    pass


from flask import request, jsonify
from backend.python.core.range_parser import RangeParser

parser = RangeParser()


@bp.route("/validate-range", methods=["POST"])
def validate_range():
    try:
        range_str = request.json.get("range", "")
        hands = parser.parse_range(range_str)
        return jsonify(
            {
                "valid": True,
                "count": len(hands),
                "sample": hands[:10],  # Show first 10 combos
            }
        )
    except ValueError as e:
        return jsonify({"valid": False, "error": str(e)}), 400


@bp.route("/update-parser", methods=["POST"])
def update_parser():
    # Allow runtime parser configuration
    new_config = request.json
    if "rank_order" in new_config:
        parser.RANKS = new_config["rank_order"]  # Customize card ranks
    return jsonify({"status": "updated"})
