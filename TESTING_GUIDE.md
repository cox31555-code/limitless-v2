# Testing Guide for Get-Quote Consolidation

This document outlines the testing strategy for the refactored get-quote flows.

## Unit Tests

Unit test files have been created in `__tests__/lib/`:

### 1. getQuoteSessionManager.test.js
Tests for session persistence and state management.

**Key test cases:**
- Session key generation for each insurance type
- Saving and loading state from sessionStorage
- Clearing state for individual flows and all flows
- Checking if state exists
- Error handling for corrupted JSON

**Running tests:**
```bash
npm test -- getQuoteSessionManager.test.js
```

### 2. getQuoteFieldValidator.test.js
Tests for field validation configuration.

**Key test cases:**
- Field definitions for each step
- Flow-specific field variations (Temp with time fields)
- Getting fields for specific steps and substeps
- Default cover substeps per flow type
- Getting all fields for a flow

**Running tests:**
```bash
npm test -- getQuoteFieldValidator.test.js
```

### 3. unifiedLazyStepsLoader.test.js
Tests for lazy component loading and caching.

**Key test cases:**
- StepFallback component rendering
- Lazy steps map creation for all three flows
- Component caching to avoid reloading
- Cache statistics and clearing
- Flow-specific variations (e.g., Annual has more steps than Temp)

**Running tests:**
```bash
npm test -- unifiedLazyStepsLoader.test.js
```

### 4. getQuoteOrchestrator.test.js
Tests for state and navigation orchestration (template).

**Key test cases:**
- Hook initialization with correct default state
- Form availability
- Step navigation state
- Default cover substeps per flow
- Handler functions availability
- State setters
- UI state management
- Empty array initialization

**Running tests:**
```bash
npm test -- getQuoteOrchestrator.test.js
```

## Integration Tests

Integration tests should verify that flows work end-to-end.

### Annual Flow Test
```javascript
// test/integration/annual-flow.test.js
describe('Annual Get Quote Flow', () => {
  it('should complete full user journey', async () => {
    // 1. Visit /annual/get-quote
    // 2. Fill vehicle registration
    // 3. Fill car value
    // 4. Fill car usage
    // 5. Fill car storage
    // 6. Fill other cars
    // 7. Fill personal details (aboutYou)
    // 8. Fill household details
    // 9. Fill employment details
    // 10. Fill licence details
    // 11. Fill licence restrictions
    // 12. Fill claims and convictions
    // 13. Fill cover details
    // 14. Add additional drivers
    // 15. Fill car owner info
    // 16. Fill NCD data
    // 17. Fill additional products
    // 18. Fill contact information
    // 19. Review and submit
    // 20. Verify redirect to /payment-summary
  });

  it('should persist state on page reload', async () => {
    // Fill form
    // Reload page
    // Verify form state is restored
  });

  it('should handle back/forward navigation', async () => {
    // Navigate forward several steps
    // Click back button
    // Verify correct step is shown
    // Verify form data is intact
  });
});
```

### Temporary Flow Test
```javascript
// test/integration/temporary-flow.test.js
describe('Temporary Get Quote Flow', () => {
  it('should include time fields in cover details', async () => {
    // Navigate to cover details step
    // Verify startTime and endTime fields are present
    // Fill time fields
    // Verify time validation works
  });

  it('should start with carOwner as default cover substep', async () => {
    // Navigate to cover step
    // Verify carOwner is shown first (not details)
  });
});
```

### Impound Flow Test
```javascript
// test/integration/impound-flow.test.js
describe('Impound Get Quote Flow', () => {
  it('should load registration step component', async () => {
    // Navigate to /impound/get-quote
    // Verify registration component is shown
  });

  it('should use correct lazy steps mapping', async () => {
    // Navigate through all steps
    // Verify correct components load
  });
});
```

## End-to-End Tests

E2E tests should verify the entire application flow using tools like Cypress or Playwright.

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Device Compatibility
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

### Test Scenarios
1. **Happy Path**
   - Complete full quote flow
   - Submit form
   - Receive confirmation

2. **Error Scenarios**
   - Missing required fields
   - Invalid input formats
   - Network errors
   - Session timeout

3. **Navigation**
   - Forward navigation works
   - Back button works
   - Browser history works
   - URL parameters work

4. **Data Persistence**
   - State persists on reload
   - State persists on navigation away and back
   - Multiple sessions don't interfere

## Performance Testing

### Bundle Size
```bash
npm run analyze
```

Expected results:
- 30-40% reduction in get-quote page chunks
- Annual page chunk: < 50KB
- Lazy components: < 20KB each

### Load Time
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3s
- Cumulative Layout Shift (CLS): < 0.1

### Runtime Performance
- Step navigation: < 100ms
- Form submission: < 500ms
- Session restoration: < 100ms

## Test Coverage Goals

### Minimum Coverage
- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

### Target Coverage
- Statements: 90%
- Branches: 85%
- Functions: 90%
- Lines: 90%

## Running All Tests

```bash
# Run unit tests
npm test

# Run with coverage
npm test -- --coverage

# Run E2E tests
npm run test:e2e

# Run performance tests
npm run test:perf

# Run all tests including linting
npm run test:all
```

## Test Data

### Annual Flow Test Data
```javascript
const annualTestData = {
  vehicleDetails: {
    registrationNumber: 'AB20XYZ',
    type: 'Car',
    make: 'BMW',
    model: '3 Series',
    year: '2020',
    fuel: 'Petrol',
    transmission: 'Automatic',
  },
  userDetails: {
    firstName: 'John',
    surname: 'Doe',
    email: 'john@example.com',
    phone: '07123456789',
    dateOfBirth: '01/01/1990',
  },
  // ... additional fields
};
```

### Temporary Flow Test Data
```javascript
const temporaryTestData = {
  ...annualTestData,
  coverDetails: {
    level: 'Third Party',
    startDate: '01/12/2024',
    startTime: '09:00',
    endDate: '08/12/2024',
    endTime: '17:00',
  },
};
```

## Continuous Integration

### GitHub Actions Workflow
```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test -- --coverage
      - run: npm run build
      - run: npm run test:e2e
```

## Test Reporting

### Metrics to Track
1. **Coverage Reports**
   - Upload to Codecov
   - Track coverage trends
   - Flag coverage regressions

2. **Performance Reports**
   - Bundle size history
   - Load time trends
   - Runtime performance metrics

3. **Error Tracking**
   - Sentry integration
   - Error rates by flow
   - User impact analysis

## Debugging Tests

### Local Debugging
```bash
# Run single test file
npm test -- getQuoteSessionManager.test.js --watch

# Run with verbose output
npm test -- --verbose

# Run with debugger
node --inspect-brk node_modules/.bin/jest getQuoteSessionManager.test.js
```

### E2E Debugging
```bash
# Run E2E tests with UI
npm run test:e2e -- --ui

# Run single E2E test
npm run test:e2e -- --grep "should complete full user journey"
```

## Known Issues and Workarounds

### Jest Configuration
- Make sure to mock `next/navigation` and `react-hook-form`
- Set up sessionStorage mock for session manager tests
- Use `act()` wrapper for state updates in hooks

### Lazy Loading
- Components load asynchronously, use `waitFor()` in tests
- Mock React.lazy for unit tests
- Use Suspense boundaries in integration tests

## Test Maintenance

### Regular Updates
- Update test data quarterly
- Review coverage reports monthly
- Update E2E tests with UI changes
- Maintain compatibility with new library versions

### Deprecation Warnings
- Address deprecation warnings immediately
- Keep Jest and Testing Library updated
- Monitor for breaking changes in dependencies

## Success Criteria

- [ ] All unit tests passing (100% pass rate)
- [ ] Coverage meets 80% minimum target
- [ ] E2E tests passing on all browsers
- [ ] No console errors or warnings
- [ ] Performance metrics within targets
- [ ] Zero critical bugs in production
- [ ] User drop-off rates unchanged or improved
