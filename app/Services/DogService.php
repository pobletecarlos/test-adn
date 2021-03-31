<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;
use App\Models\Dog;
use App\Repositories\DogRepository;
use App\Contracts\DogServiceContract;

class DogService implements DogServiceContract
{
    /**
     * @var $dogRepository
     */
    protected $dogRepository;

    /**
     * DogService constructor
     *
     * @param DogRepository $dogRepository
     */
    public function __construct(DogRepository $dogRepository)
    {
        $this->dogRepository = $dogRepository;
    }

    /**
     * Get all Dog
     *
     * @return String
     */
    public function getAll()
    {
        return $this->dogRepository->getAll();
    }

     /**
     * Save new dog
     * @param array $data
     * @return String
     */
    public function saveDogData($data)
    {
        $validator = Validator::make($data, [
            'name' => 'bail|required|unique:dogs|max:30',
            'color' => 'bail|required|max:30',
            'breed' => 'bail|required|max:30'
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        $result = $this->dogRepository->save($data);

        return $result;
    }

     /**
     * Update Dog
     * @param array $data
     * @return String
     */
    public function updateDog($id, $data)
    {
        $validator = Validator::make($data, [
            'name' => 'bail|required|max:30',
            'color' => 'bail|required|max:30',
            'breed' => 'bail|required|max:30'
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        DB::beginTransaction();

        try {
            $dog = $this->dogRepository->update($data, $id);

        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());
            throw new InvalidArgumentException('Ocurrió un error al actualizar los datos');
        }

        DB::commit();

        return $dog;
    }

    /**
     * Delete dog.
     *
     * @param $id
     * @return String
     */
    public function deleteById($id)
    {
        DB::beginTransaction();

        try {
            $dog = $this->dogRepository->delete($id);

        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());
            throw new InvalidArgumentException('Ocurrió un error al eliminar los datos');
        }

        DB::commit();

        return $dog;
    }
}