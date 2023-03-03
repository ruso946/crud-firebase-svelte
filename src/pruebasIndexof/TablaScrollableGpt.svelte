<style>
  .table-container {
    overflow-y: auto;
    height: 300px;
  }

  th, td {
    padding: 10px;
    text-align: left;
  }

  th {
    position: sticky;
    top: 0;
    background-color: #f1f1f1;
  }
</style>

<script>
  let data = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
    { id: 4, name: 'David', age: 40 },
    { id: 5, name: 'Eva', age: 45 },
  ];

  let columns = [
    { label: 'ID', field: 'id' },
    { label: 'Name', field: 'name' },
    { label: 'Age', field: 'age' },
  ];
</script>

<div class="table-container">
  <table>
    <thead>
      <tr>
        {#each columns as column}
          <th>{column.label}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data as row}
        <tr>
          {#each columns as column}
            <td>{row[column.field]}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

