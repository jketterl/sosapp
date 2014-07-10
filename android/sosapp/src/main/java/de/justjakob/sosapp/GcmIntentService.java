package de.justjakob.sosapp;

import android.app.IntentService;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

public class GcmIntentService extends IntentService{
    private static final int NOTIFICATION_ID = 1;

    public GcmIntentService() {
        super("GcmIntentService");
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        Log.d("GcmIntentService", "received something!");

        if (intent.hasExtra("sos") && intent.getStringExtra("sos").equals("started")) {
            notifyStart();
        } else {
            Log.d("GcmIntentService", "don't know how to handle message");
        }

        GcmReceiver.completeWakefulIntent(intent);
    }

    private void notifyStart() {
        NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        PendingIntent homeIntent = PendingIntent.getActivity(this, 0, new Intent(this, HomeActivity.class), 0);

        NotificationCompat.Builder b = new NotificationCompat.Builder(this);

        b.setContentTitle("Scrum of Scrums")
         .setContentText("Scrum of Scrums is starting!")
         .setWhen(System.currentTimeMillis())
         .setSmallIcon(R.drawable.abc_ic_go)
         .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.drawable.ic_launcher))
         .setAutoCancel(true)
         .setDefaults(Notification.DEFAULT_SOUND | Notification.DEFAULT_VIBRATE)
         .setContentIntent(homeIntent);
        
        nm.notify(NOTIFICATION_ID, b.build());
    }
}
