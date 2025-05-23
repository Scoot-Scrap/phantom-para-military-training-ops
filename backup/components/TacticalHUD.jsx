export default function TacticalHUD({ node, onDecision }) {
  return (
    <div className="hud">
      <h2>Mission Scenario</h2>
      <p>{node.description}</p>
      {node.options.map((option, index) => (
        <button key={index} onClick={() => onDecision(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}
