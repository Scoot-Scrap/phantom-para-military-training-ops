export default function AfterActionReport({ decisions }) {
  return (
    <div className="aar">
      <h2>After-Action Report</h2>
      <ul>
        {decisions.map((decision, index) => (
          <li key={index}>
            Decision {index + 1}: {decision}
          </li>
        ))}
      </ul>
    </div>
  );
}
