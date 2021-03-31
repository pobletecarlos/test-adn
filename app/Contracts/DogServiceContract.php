<?php 

namespace App\Contracts;

Interface DogServiceContract {
    public function getAll();
    public function saveDogData($data);
    public function updateDog($id, $data);
    public function deleteById($id);
}