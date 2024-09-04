import ExpoModulesCore

public class SystemCheckerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("SystemChecker")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("getSystem") { () -> String in
    "\(UIDevice.current.name), \(UIDevice.current.systemVersion)"
    }
  }
}
