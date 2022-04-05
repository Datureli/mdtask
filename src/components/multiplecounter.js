<div>
<ul>
{categoryCounter.map((value, index) => (
<div
value={value}
onIncrement={() => {
  const countersCopy = [...categoryCounter];
  countersCopy[index] += 1;
  setCategoryCounter(countersCopy);
}}
onDecrement={() => {
  const countersCopy = [...categoryCounter];
  countersCopy[index] -= 1;
  setCategoryCounter(countersCopy);
}}
/>
))}
</ul>

</div>