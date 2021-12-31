# Jest

![Jest logo](https://cdn.auth0.com/blog/testing-react-with-jest/logo.png)

* Zero config
* Permite snapshots
* Aislados
* API sencilla
* Por defecto con create-react-app
* Coverage

## Common matchers

La forma más sencilla de comprobar el valor de un test es:

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

Si queremos comparar objectos deberiamos usar `toEqual` ya que este comprueba cada campo y valor de un objeto o de un array:

```js
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

Hay diferencias entre `toEqual` y `toStrictEqual`:

* Las keys con propiedades undefined son comprobadas, es decir, `{a: undefined, b: 2}` no va a ser igual que `{b: 2}` cuando usas `toStrictEqual`
* Las posiciones ignoradas en un array son comprobadas, es decir, `[, 1]` no va a ser igual que `[undefined, 1]` cuando usas `toStrictEqual`
* Los tipos de objetos son comprobados, es decir, una clase con una propiedad `a` no va a ser igual que un objeto con una propiedad `a`

### Truthiness

Hay veces que en los tests que escribimos tenemos que distinguir entre `null`, `undefined` o `false` para ello existen los siguientes matchers:

* toBeNull
* toBeUndefined
* toBeDefined
* toBeTruthy
* toBeFalsy

### Numbers

Cuando estamos tratando con números hay veces que no solo queremos comprobar que el valor sea igual por lo que tenemos otros matchers:

```js
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

### Strings

Podemos jugar con los strings y ver si pasan una expresión regular:

```js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});
```

### Arrays

Un test muy común es ver si un array contiene cierto elemento:

```js
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
});
```

### Excepciones

Si una función lanza una excepción podemos comprobarlo:

```js
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
```