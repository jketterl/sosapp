package de.justjakob.sosapp;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.AsyncTask;
import android.os.IBinder;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;

import com.google.android.gms.gcm.GoogleCloudMessaging;

import java.io.IOException;


public class HomeActivity extends ActionBarActivity {

    ServiceConnection conn = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
            ((SosService.LocalBinder) iBinder).getService().triggerSos();
            unbindService(this);
        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {}
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        processGcmRegistration();

        Button triggerButton = (Button) findViewById(R.id.triggerButton);
        triggerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                bindService(new Intent(HomeActivity.this, SosService.class), conn, Context.BIND_AUTO_CREATE);
            }
        });
    }

    private void processGcmRegistration() {
        final GoogleCloudMessaging gcm = GoogleCloudMessaging.getInstance(this);
        new AsyncTask<Object, Object, Object>() {

            @Override
            protected Object doInBackground(Object[] objects) {
                try {
                    final String regId = gcm.register("996547710971");

                    ServiceConnection conn = new ServiceConnection() {
                        @Override
                        public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
                            ((SosService.LocalBinder) iBinder).getService().register(regId);
                            unbindService(this);
                        }

                        @Override
                        public void onServiceDisconnected(ComponentName componentName) {}
                    };

                    bindService(new Intent(HomeActivity.this, SosService.class), conn, Context.BIND_AUTO_CREATE);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                return null;
            }
        }.execute();
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.home, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
