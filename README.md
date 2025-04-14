# Autor 
My way for running TS scripts

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

### **Open in VSCode**  
```bash
code .
```

### **Create script file**
```typescript
import "autor"
```

### **Smash F5**  
#### Here's what happens:
- VSCode launches a `tsc --watch` process in the background
- After successful compilation, run current .ts file
#### ```import "autor"``` will:
1. **Load env modules**
- Any subfolder under ./env containing 0.ts file is env module
- Example: ./env/database/0.ts gets auto-imported

2. **Load configuration scripts**  
Configuration scripts load in this order:  
- ```./.autor.ts```
- ```./<your>/.autor.ts```
- ```./<your>/<script>/.autor.ts```
- ```./<your>/<script>/<file>.cfg.ts```

3. **Initialization**  
- Sequentially `await` all env modules' `init()` functions  
- Then `await` all loaded config scripts' `init()` methods