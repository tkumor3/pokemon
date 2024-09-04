package expo.modules.systemchecker

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.os.Build

class SystemCheckerModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("SystemChecker")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("getSystem") {
      Build.DEVICE + ", " + Build.VERSION.SDK_INT
    }
  }
}
