import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing sum -- fail', () => {
  const expected = 100;
  const got = mut.sum(12, 18);
  expect(got).not.toBe(expected);
});

test('Testing div -- success', () => {
  const expected = 10;
  const got = mut.div(100,10);
  expect(got).toBe(expected);
});

test('Testing div -- error', () => {
  expect(() => mut.div(2,0)).toThrow();
})

test('Testing containsNumbers -- success', () => {
  
  const got = mut.containsNumbers("1234");
  expect(got).toBeTruthy();
})

test('Testing containsNumbers -- fail', () => {
  const got = mut.containsNumbers("abcd");
  expect(got).toBeFalsy();
})

test('Testing containsNumbers -- success', () => {
  
  const got = mut.containsNumbers("endofstring1");
  expect(got).toBeTruthy();
})

test('Testing containsNumbers -- success', () => {
  
  const got = mut.containsNumbers("1startofstring");
  expect(got).toBeTruthy();
})

test('Testing containsNumbers -- success', () => {
  
  const got = mut.containsNumbers('4');
  expect(got).toBeTruthy();
})

test('Testing containsNumbers -- fail', () => {
  
  const got = mut.containsNumbers('a');
  expect(got).toBeFalsy();
})