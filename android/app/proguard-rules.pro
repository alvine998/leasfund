# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Keep React Native classes
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }

# Keep Native Modules
-keep class com.leasefund.** { *; }

# Keep annotations
-keepattributes *Annotation*

# Prevent stripping of JNI methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Do not strip classes required by Firebase (if using Firebase)
-keep class com.google.firebase.** { *; }
-keep class com.google.android.gms.** { *; }

# Do not strip JSON annotations
-keepattributes *Annotation*

