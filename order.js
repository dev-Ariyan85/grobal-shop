// Sample data
const orders = [
  { id: 'ORD-1001', customer: 'Rafi Ahmed', items: 3, total: 72.50, status: 'pending', date: '2025-09-22', address: 'Dhaka, Bangladesh', products:[{name:'T-shirt',qty:2,price:20},{name:'Cap',qty:1,price:32.5}] },
  { id: 'ORD-1002', customer: 'Sonia Rahman', items: 1, total: 15.00, status: 'processing', date: '2025-09-21', address:'Chattogram', products:[{name:'Mug',qty:1,price:15}] },
  { id: 'ORD-1003', customer: 'Tanvir', items: 2, total: 120.00, status: 'shipped', date: '2025-09-20', address:'Sylhet', products:[{name:'Jacket',qty:1,price:90},{name:'Socks',qty:1,price:30}] },
  { id: 'ORD-1004', customer: 'Ayesha', items: 4, total: 44.00, status: 'delivered', date: '2025-09-19', address:'Khulna', products:[{name:'Notebook',qty:4,price:11}] },
  { id: 'ORD-1005', customer: 'Rashed', items: 2, total: 60.00, status: 'cancelled', date: '2025-09-18', address:'Barishal', products:[{name:'Shoes',qty:1,price:60}] },
];

// Pagination and state
let filtered = [...orders];
let currentPage = 1;
const perPage = 10;

const ordersBody = document.getElementById('ordersBody');
const statusFilter = document.getElementById('statusFilter');
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const orderModal = document.getElementById('orderModal');
const modalContent = document.getElementById('modalContent');

function renderRows(){
  ordersBody.innerHTML = '';
  const start = (currentPage-1)*perPage;
  const pageItems = filtered.slice(start, start+perPage);
  pageItems.forEach(o => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm font-medium text-gray-900">${o.id}</div>
        <div class="text-xs text-gray-500">${o.id.replace('ORD-','')}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm">${o.customer}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm">${o.items}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm">৳ ${o.total.toFixed(2)}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-${statusColor(o.status)}-100 text-${statusColor(o.status)}-800">${o.status}</span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${o.date}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm">
        <button data-id="${o.id}" class="viewBtn px-3 py-1 border rounded-md mr-2">View</button>
        <button data-id="${o.id}" class="shipBtn px-3 py-1 border rounded-md">Ship</button>
      </td>
    `;
    ordersBody.appendChild(tr);
  });
  document.getElementById('paginationInfo').textContent = `Showing ${Math.min(start+1, filtered.length)}-${Math.min(start+perPage, filtered.length)} of ${filtered.length}`;
  attachRowListeners();
}

function statusColor(status){
  switch(status){
    case 'pending': return 'yellow';
    case 'processing': return 'blue';
    case 'shipped': return 'indigo';
    case 'delivered': return 'green';
    case 'cancelled': return 'red';
    default: return 'gray';
  }
}

function attachRowListeners(){
  document.querySelectorAll('.viewBtn').forEach(b=>b.addEventListener('click', e=>{
    const id = e.currentTarget.dataset.id;
    openModal(id);
  }));
  document.querySelectorAll('.shipBtn').forEach(b=>b.addEventListener('click', e=>{
    const id = e.currentTarget.dataset.id;
    markAsShipped(id);
  }));
}

function openModal(id){
  const order = orders.find(x=>x.id===id);
  if(!order) return;
  modalContent.innerHTML = `
    <div class="grid grid-cols-2 gap-4">
      <div>
        <div class="text-sm text-gray-500">Order</div>
        <div class="font-medium text-lg">${order.id}</div>
        <div class="text-sm text-gray-500 mt-2">${order.date}</div>
      </div>
      <div>
        <div class="text-sm text-gray-500">Customer</div>
        <div class="font-medium">${order.customer}</div>
        <div class="text-xs text-gray-500">${order.address}</div>
      </div>
    </div>
    <hr class="my-4" />
    <div>
      <h4 class="font-medium">Items</h4>
      <ul class="mt-2 space-y-2">${order.products.map(p=>`<li class="flex justify-between text-sm"><span>${p.name} × ${p.qty}</span><span>৳ ${p.price.toFixed(2)}</span></li>`).join('')}</ul>
      <div class="text-right mt-3 font-semibold">Total: ৳ ${order.total.toFixed(2)}</div>
    </div>
  `;
  orderModal.classList.remove('hidden');
  orderModal.classList.add('flex');
  document.getElementById('markShipped').dataset.id = order.id;
}

function closeModal(){
  orderModal.classList.add('hidden');
  orderModal.classList.remove('flex');
}

function markAsShipped(id){
  const order = orders.find(x=>x.id===id);
  if(!order) return alert('Order not found');
  order.status = 'shipped';
  filtered = applyFilters();
  renderRows();
  closeModal();
}

function applyFilters(){
  const status = statusFilter.value;
  const q = searchInput.value.trim().toLowerCase();
  return orders.filter(o=>{
    const statusOk = (status==='all') ? true : o.status===status;
    const searchOk = q.length===0 ? true : (o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q));
    return statusOk && searchOk;
  });
}

// Events
statusFilter.addEventListener('change', ()=>{ filtered = applyFilters(); currentPage = 1; renderRows(); });
searchInput.addEventListener('input', ()=>{ searchClear.style.display = searchInput.value ? 'inline' : 'none'; filtered = applyFilters(); currentPage = 1; renderRows(); });
searchClear.addEventListener('click', ()=>{ searchInput.value=''; searchClear.style.display='none'; filtered = applyFilters(); renderRows(); });

document.getElementById('prevPage').addEventListener('click', ()=>{ if(currentPage>1){ currentPage--; renderRows(); } });
document.getElementById('nextPage').addEventListener('click', ()=>{ if((currentPage*perPage) < filtered.length){ currentPage++; renderRows(); } });

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('closeModal2').addEventListener('click', closeModal);
document.getElementById('markShipped').addEventListener('click', e=>{ const id = e.currentTarget.dataset.id; if(id) markAsShipped(id); });

// Sidebar toggle for small screens
document.getElementById('menuBtn').addEventListener('click', ()=>{
  const sb = document.getElementById('sidebar');
  sb.classList.toggle('hidden');
});

// Export CSV (simple client-side)
document.getElementById('exportBtn').addEventListener('click', ()=>{
  const rows = filtered.map(o => ({id:o.id,customer:o.customer,items:o.items,total:o.total,status:o.status,date:o.date}));
  const csv = [Object.keys(rows[0]||{}).join(','), ...rows.map(r=>Object.values(r).map(v=>`"${String(v).replace(/\"/g,'""')}"`).join(','))].join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'orders.csv'; a.click(); URL.revokeObjectURL(url);
});

// Initial render
filtered = applyFilters();
renderRows();
