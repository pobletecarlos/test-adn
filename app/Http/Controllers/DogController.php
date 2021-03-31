<?php

namespace App\Http\Controllers;
use Exception;
use Illuminate\Http\Request;
use App\Models\Dog;
use App\Http\Resources\DogResource;
use App\Services\DogService;

class DogController extends Controller
{
    /**
     * @var dogService
     */
    protected $dogService;

    /**
     * DogController Contructor
     * @param DogService $dogService
     */
    public function __construct(DogService $dogService)
    {
        $this->dogService = $dogService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $dogs = $this->dogService->getAll();
            return DogResource::collection($dogs); 

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $data = $request->only(['name', 'color', 'breed']);
            $res = $this->dogService->saveDogData($data);
            return response()->json($res, 200);
        } catch(Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        try {
            $data = $request->only(['name', 'color', 'breed']);
            $res = $this->dogService->updateDog($id, $data);
            return new DogResource($res); 
        } catch(Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        try {
            $res = $this->dogService->deleteById($id);
            return response()->json($res, 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}