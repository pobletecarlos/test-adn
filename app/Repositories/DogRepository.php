<?php

namespace App\Repositories;

use App\Models\Dog;

class DogRepository
{
    /**
     * @var dog
     */
    protected $dog;

    /**
     * DogRepository constructor.
     *
     * @param Dog $dog
     */
    public function __construct(Dog $dog)
    {
        $this->dog = $dog;
    }

    /**
     * Get dogs.
     *
     * @return Dog $dog
     */
    public function getAll()
    {
        return $this->dog->get();
    }

    /**
     * Save Dog
     *
     * @param $data
     * @return Dog
     */
    public function save($data)
    {
        $dog = new $this->dog;

        $dog->name = $data['name'];
        $dog->color = $data['color'];
        $dog->breed = $data['breed'];

        $dog->save();

        return $dog->fresh();
    }

    /**
     * Update dog
     *
     * @param $data
     * @param $id
     * @return dog
     */
    public function update($data, $id)
    {
        
        $dog = $this->dog->find($id);

        $dog->name = $data['name'];
        $dog->color = $data['color'];
        $dog->breed = $data['breed'];

        $dog->update();

        return $dog;
    }

    /**
     * Update dog
     *
     * @param $id
     * @return dog
     */
    public function delete($id)
    {
        
        $dog = $this->dog->find($id);
        $dog->delete();

        return $dog;
    }

}