<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class HelperProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
        foreach (glob(app_path() . '/Helpers/*.php') as $helpersfilename)
        {
            require_once($helpersfilename);
        }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
