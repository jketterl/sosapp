package de.justjakob.sosapp;

import android.app.Service;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Binder;
import android.os.IBinder;
import android.util.Log;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class SosService extends Service {
    private Binder binder = new LocalBinder();

    public class LocalBinder extends Binder {
        public SosService getService() {
            return SosService.this;
        }
    }

    private static class Http extends AsyncTask<URL, Object, Object> {
        @Override
        protected Object doInBackground(URL... urls) {
            for (URL u : urls) {
                try {
                    Log.d("SosService", "requesting: " + u);
                    int status = ((HttpURLConnection) u.openConnection()).getResponseCode();
                    Log.d("SosService", "response was: " + status);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return null;
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return binder;
    }

    public void triggerSos() {
        Log.d("SosService", "triggering SOS!");
        try {
            URL trigger = new URL("http://sosapp.justjakob.de/rest/start");
            new Http().execute(trigger);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

    /*
    public void register() {

    }
    */
}
