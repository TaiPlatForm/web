// Danh sách động vật sẽ được lưu trong mảng
let animals = [];

// Hàm hiển thị danh sách động vật
function renderAnimalList() {
    const animalList = document.getElementById('animalList');
    animalList.innerHTML = '';

    animals.forEach((animal, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${animal.name}</td>
            <td>${animal.type}</td>
            <td>${animal.age}</td>
            <td>${animal.habitat}</td>
            <td>
                <button onclick="editAnimal(${index})">Sửa</button>
                <button onclick="deleteAnimal(${index})">Xóa</button>
            </td>
        `;
        animalList.appendChild(row);
    });
}

// Thêm động vật mới
document.getElementById('animalForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('animalName').value;
    const type = document.getElementById('animalType').value;
    const age = document.getElementById('animalAge').value;
    const habitat = document.getElementById('animalHabitat').value;

    const newAnimal = {
        name,
        type,
        age,
        habitat
    };

    animals.push(newAnimal);
    renderAnimalList();

    // Xóa trắng form sau khi thêm
    document.getElementById('animalForm').reset();
});

// Xóa động vật
function deleteAnimal(index) {
    animals.splice(index, 1);
    renderAnimalList();
}

// Sửa thông tin động vật
function editAnimal(index) {
    const animal = animals[index];

    // Đổ dữ liệu động vật vào form để sửa
    document.getElementById('animalName').value = animal.name;
    document.getElementById('animalType').value = animal.type;
    document.getElementById('animalAge').value = animal.age;
    document.getElementById('animalHabitat').value = animal.habitat;

    // Sau khi sửa xong, bấm nút "Thêm Động Vật" sẽ cập nhật thay vì thêm mới
    document.getElementById('animalForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Cập nhật thông tin động vật
        animals[index] = {
            name: document.getElementById('animalName').value,
            type: document.getElementById('animalType').value,
            age: document.getElementById('animalAge').value,
            habitat: document.getElementById('animalHabitat').value
        };

        renderAnimalList();
        document.getElementById('animalForm').reset(); // Xóa trắng form
    }, {once: true}); // Sự kiện chỉ được gọi một lần khi submit
}

// Tìm kiếm động vật
function searchAnimal() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredAnimals = animals.filter(animal => 
        animal.name.toLowerCase().includes(searchTerm) || 
        animal.type.toLowerCase().includes(searchTerm) || 
        animal.habitat.toLowerCase().includes(searchTerm)
    );

    const animalList = document.getElementById('animalList');
    animalList.innerHTML = '';

    filteredAnimals.forEach((animal, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${animal.name}</td>
            <td>${animal.type}</td>
            <td>${animal.age}</td>
            <td>${animal.habitat}</td>
            <td>
                <button onclick="editAnimal(${index})">Sửa</button>
                <button onclick="deleteAnimal(${index})">Xóa</button>
            </td>
        `;
        animalList.appendChild(row);
    });
}
