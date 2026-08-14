# Autor 
My way for running TS scripts

Use Node.js 24+’s native type stripping to run TS directly, no compilation step.

## Quick Start
### **Clone the template**
```bash
git clone https://github.com/zarmot/autor-workspace
```

### **NPM Install**
```bash
cd autor-workspace
npm install
```

### **Open in Editor**  
```bash
code .
```

### **Create script file**
```typescript
import "autor"
```

### **Smash F5**  
Node.js launches and runs the current .ts file directly (no tsc build step).
#### ```import "autor"``` will:
1. **Load env modules**
- Any subfolder under ./env containing 0.ts file is env module
- Example: ./env/util/0.ts gets auto-imported

2. **Load configuration scripts**  
Configuration scripts load in this order:  
- ```./.autor.ts```
- ```./<your>/.autor.ts```
- ```./<your>/<script>/.autor.ts```
- ```./<your>/<script>/<file>.cfg.ts```

3. **Initialization**  
- Sequentially `await` all env modules' `init()` functions  
- Then `await` all loaded config scripts' `init()` methods

