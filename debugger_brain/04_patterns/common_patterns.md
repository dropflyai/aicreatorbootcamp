# Common Error Patterns

## Pattern Library

This file contains known error patterns and their solutions. **Always check here before debugging.**

---

## React Native / Expo Patterns

### Pattern: "Cannot read property 'X' of undefined"
**Cause**: Accessing property on null/undefined object
**Fix**: Add null check or optional chaining (`?.`)
**Prevention**: Use TypeScript strict mode, null checks

### Pattern: "Invariant Violation: Text strings must be rendered within a <Text> component"
**Cause**: Raw string outside Text component
**Fix**: Wrap string in `<Text>` tags
**Prevention**: Lint rules for JSX

### Pattern: "VirtualizedLists should never be nested inside plain ScrollViews"
**Cause**: FlatList inside ScrollView
**Fix**: Use FlatList's ListHeaderComponent/ListFooterComponent
**Prevention**: Avoid nesting virtualized lists

### Pattern: "Each child in a list should have a unique 'key' prop"
**Cause**: Missing or duplicate keys in list
**Fix**: Add unique key prop to each item
**Prevention**: Always use unique identifiers as keys

---

## TypeScript Patterns

### Pattern: "Type 'X' is not assignable to type 'Y'"
**Cause**: Type mismatch
**Fix**: Correct the type or add proper type guard
**Prevention**: Strict TypeScript configuration

### Pattern: "Property 'X' does not exist on type 'Y'"
**Cause**: Accessing undefined property
**Fix**: Add property to type or check if it exists
**Prevention**: Define complete types

### Pattern: "Object is possibly 'undefined'"
**Cause**: Optional value accessed without check
**Fix**: Add null check or use non-null assertion
**Prevention**: Strict null checks

---

## Supabase Patterns

### Pattern: "JWT expired"
**Cause**: Auth token expired
**Fix**: Refresh the session
**Prevention**: Implement token refresh logic

### Pattern: "new row violates row-level security policy"
**Cause**: RLS blocking operation
**Fix**: Check RLS policies, ensure user has permission
**Prevention**: Test RLS policies thoroughly

### Pattern: "null value in column 'X' violates not-null constraint"
**Cause**: Required field missing
**Fix**: Provide value for required field
**Prevention**: Validate data before insert

---

## State Management Patterns

### Pattern: State not updating
**Cause**: Mutating state directly
**Fix**: Use immutable update patterns
**Prevention**: Use immer or spread operator

### Pattern: Stale closure
**Cause**: Function capturing old state value
**Fix**: Use useCallback with proper dependencies
**Prevention**: ESLint exhaustive-deps rule

### Pattern: Infinite re-render
**Cause**: State update in useEffect without proper deps
**Fix**: Add correct dependencies or move update
**Prevention**: Review useEffect dependencies

---

## API Patterns

### Pattern: "Network request failed"
**Cause**: Network issue or CORS
**Fix**: Check network, check CORS headers
**Prevention**: Proper error handling, retry logic

### Pattern: 401 Unauthorized
**Cause**: Missing or invalid auth token
**Fix**: Check authentication flow
**Prevention**: Token refresh logic

### Pattern: 500 Internal Server Error
**Cause**: Server-side bug
**Fix**: Check server logs, fix server code
**Prevention**: Server-side error handling

---

## Build/Deploy Patterns

### Pattern: "Module not found"
**Cause**: Missing dependency or wrong import path
**Fix**: Install dependency or fix import
**Prevention**: Verify imports after refactoring

### Pattern: "Cannot find module 'X' or its corresponding type declarations"
**Cause**: Missing @types package
**Fix**: Install @types/X package
**Prevention**: Check types when adding dependencies

---

## Adding New Patterns

When you encounter a recurring bug (3+ times), add it here:

```markdown
### Pattern: [Error message]
**Cause**: [Why this happens]
**Fix**: [How to fix it]
**Prevention**: [How to avoid it]
```
