function RangeParserSettings({ show, onHide }) {
  const [settings, setSettings] = useState({
    rankOrder: '23456789TJQKA',
    allowDuplicates: false
  });

  const saveSettings = () => {
    fetch('/api/update-parser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rank_order: settings.rankOrder,
        allow_duplicates: settings.allowDuplicates
      })
    }).then(() => onHide());
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Range Parser Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Card Rank Priority</Form.Label>
            <Form.Control
              value={settings.rankOrder}
              onChange={(e) => setSettings({...settings, rankOrder: e.target.value})}
            />
            <Form.Text>Default: 23456789TJQKA</Form.Text>
          </Form.Group>
          
          <Form.Check
            type="switch"
            label="Allow duplicate cards"
            checked={settings.allowDuplicates}
            onChange={(e) => setSettings({...settings, allowDuplicates: e.target.checked})}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={saveSettings}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}