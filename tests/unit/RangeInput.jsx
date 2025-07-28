import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';

const RangeInput = ({ onRangeChange, initialRange = "AA,KK,QQ" }) => {
  const [range, setRange] = useState(initialRange);
  const [validationError, setValidationError] = useState("");

  // Predefined range shortcuts
  const PRESET_RANGES = {
    'Tight': 'QQ+,AKs,AJs+,KQs',
    'Loose': '22+,A2+,K2+,Q5o+,J8o+,T9o+',
    'Custom': ''
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      onRangeChange(range);
      setValidationError("");
    } catch (err) {
      setValidationError(`Invalid range: ${err.message}`);
    }
  };

  return (
    <Card className="range-input">
      <Card.Header>Hand Range Editor</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Range Notation</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={range}
              onChange={(e) => setRange(e.target.value)}
              placeholder="AA,KK,AKs,A2s+,KQo..."
            />
            {validationError && (
              <Form.Text className="text-danger">{validationError}</Form.Text>
            )}
          </Form.Group>

          <Row className="mt-3">
            <Col>
              <h6>Presets:</h6>
              {Object.entries(PRESET_RANGES).map(([name, preset]) => (
                <Button
                  key={name}
                  variant="outline-secondary"
                  size="sm"
                  className="me-2 mb-2"
                  onClick={() => setRange(preset)}
                  disabled={!preset}
                >
                  {name}
                </Button>
              ))}
            </Col>
          </Row>

          <Button type="submit" className="mt-3">
            Apply Range
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RangeInput;
const [validationResult, setValidationResult] = useState(null);

const validateRange = useDebouncedCallback((rangeToValidate) => {
  fetch('/api/validate-range', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ range: rangeToValidate })
  })
    .then(res => res.json())
    .then(data => setValidationResult(data));
}, 500);  // Debounce to avoid spamming API

useEffect(() => {
  if (range) validateRange(range);
}, [range]);