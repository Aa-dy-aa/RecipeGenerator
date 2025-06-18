import React from 'react'

function DropdownOption({children}) {
  return (
    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {children}
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Delete</a></li>
  </ul>
</div>
  )
}

export default DropdownOption