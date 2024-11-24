---
title: 📖파이썬 코딩의 기술#2 - 함수
date: '2023-12-25'
tags: ['Python']
draft: false
summary: 파이썬 코딩의 기술 읽고 공부하기 - Ch2. 함수
---

# Ch2. 함수

## None을 반환하기보다는 예외를 일으키자

유틸리티 함수를 작성할 때 특별한 의미를 부여하기 위해 `None`을 반환하게 되면 `None`이나 다른 값(0이나 문자열과 같은)이 조건식에서 `False`로 평가되기 때문에 오류를 일으킬 가능성이 생긴다.

따라서 특별한 상황을 알릴 때, `None`을 반환하는 대신 호출하는 쪽에 예외를 일으켜서 호출하는 쪽에서 그 예외를 처리하게 하는 것이 좋다.

<br/>

## 클로저가 변수 스코프와 상호 작용하는 방법을 알자

리스트의 `sort` 메서드에 헬퍼 함수를 `key`인수로 넘겨서 헬퍼의 반환 값으로 리스트에 있는 각 아이템을 정렬하는 값으로 사용한 뒤 정렬 하는 함수는 다음과 같다.

```python
def sort_priority(values, group):
    def helper(x):
        if x in group:
            return (0, x)
        return (1, x)
    values.sort(key=helper)
```
```python
numbers = [8, 3, 1, 2, 5, 4, 7, 6]
group = {2, 3, 5, 7}
sort_priority(numbers, group)
print(numbers)
```
```
>>>
[2, 3, 5, 7, 1, 4, 6, 8]
```

함수가 예상대로 동작한 이유는 세 가지이다.
- 파이썬은 클로저(`closer`)를 지원한다. `클로저`란 자신이 정의된 스코프에 있는 변수를 참조하는 함수다. 바로 이 점 덕분에 `helper`함수가 `sort_priority`의 group인수에 접근할 수 있다.
- 함수는 파이썬에서 일급 객체(first-class object)이다. 이 말은 함수를 직접 참조하고, 변수에 할당하고, 다른 함수의 인수로 전달하고, 표현식과 `if`문 등에서 비교할 수 있다는 의미다. 따라서 `sort`메서드에서 클로저 함수를 `key`인수로 받을 수 있다.
- 파이썬에서 튜플을 비교하는 특정한 규칙이 있다. 먼저 인덱스 0으로 아이템을 비교하고 그 다음으로 인덱스 1, 다음은 인덱스 2와 같이 진행한다. `helper`클로저의 반환 값이 정렬 순서를 분리된 두 그룹으로 나뉘게 한 것은 이 규칙 때문이다.


함수에서 우선순위가 높은 아이템을 발견했는지 여부를 반환해서 사용자 인터페이스 코드가 그에 따라 동작하도록 코드를 수정해 보자.

```python
def sort_priority2(numbers, group):
    fount = False
    def helper(x):
        if x in group:
            fount = True
            return (0, x)
        return (1, x)
    numbers.sort(key=helper)
    return found
```

```python
found = sort_priority2(numbers, group)
print('Found: ', found)
print(numbers)
```
```
Found: found
[2, 3, 5, 7, 1, 4, 6, 8]
```

정렬된 결과는 올바르지만 found 결과는 틀렸다. group에 속한 아이템을 numbers에서 찾을 수 있었지만 함수는 False를 반환했다. 왜 이런일이 일어났을까?

이유는 파이썬에서 변수를 할당할 때, 현재 스코프에 존재하지 않으면 변수 정의로 취급한다. 즉, 새로 정의되는 변수의 스코프는 그 할당을 포함하고 있는 함수가 된다.

이 문제는 초보자들을 놀라게 한다고 해서 `스코프 버그(scope bug)`라고도 한다. 하지만 이 동작은 지역 변수가 자신을 포함하는 모듈을 오염시키는 문제를 막아주기 위한 언어 설계자가 의도한 결과이다.

파이썬 3에는 클로저에서 데이터를 얻어오는 특별한 문법이 있다. `nonlocal`문은 특정 변수 이름에 할당할 때 스코프 탐색이 일어나야 함을 나타낸다. `nonlocal` 문은 변수 할당이 모듈 스코프에 직접 들어가게 하는 `global` 문을 보완한다.

하지만 전역 변수의 안티패턴과 마찬가지로 간단한 함수 이외에는 `nonlocal`을 사용하지 않도록 주의해야 한다. `nonlocal`의 부작용은 알아내기가 상당히 어렵기 때문이다. `nonlocal`을 사용할 때 복잡해지기 시작하면 헬퍼 클래스로 상태를 감싸는 방법을 이용하는 것이 낫다. 다음은 `nonlocal`을 사용할 때와 같은 결과를 얻는 클래스이다. 코드는 약간 더 길지만 이해하기는 훨씬 쉽다.

```python
class Sorter(object):
    def __init__(self, group):
        self.group = group
        self.found = False
    
    def __call__(self, x):
        if x in self.group:
            self.found = True
            return (0, x)
        return (1, x)


sorter = Sorter(group)
numbers.sort(key=sorter)
assert sorter.found is True
```

## 리스트를 반환하는 대신 제너레이터를 고려하자

일련의 결과를 생성하는 함수에서 택할 가장 간단한 방법은 아이템의 리스트를 반환하는 것이다. 예를 들어, 다음은 문자열에 있는 모든 단어의 인덱스를 출력하는 코드이다.

```python
def index_words(text):
    result = []
    if text:
        result.append(0)
    for index, letter in enumerate(text):
        if letter == ' ':
            result.append(index + 1)
    return result
```

하지만 위의 함수에는 두가지 문제가 있다.

첫 번째 문제는 코드가 약간 복잡하고 깔끔하지 않다는 점이다. 새로운 결과가 나올 때마다 append 메서드를 호출해야 한다. 메서드 호출(result.append)이 많아서 리스트에 추가하는 값 `index + 1`이 덜 중요해 보인다.

이 함수를 작성하는 더 좋은 방법은 `제너레이터(generator)`를 사용하는 것이다. `제너레이터`는 `yield` 표현식을 사용하는 함수이다. 제너레이터 함수는 호출되면 실제로 실행하지 않고 바로 `이터레이터`를 반환한다. 내장 함수 `next`를 호출할 때마다 이터레이터는 제너레이터가 다음 `yield` 표현식으로 진행하게 한다. 제너레이터에서 yield에 전달한 값을 이터레이터가 호출하는 쪽에 반환한다.

다음은 앞에서 본 함수와 동일한 결과를 생성하는 제너레이터 함수이다.

```python
def index_words_iter(text):
    if text:
        yield 0
    for index, letter in enumerate(text):
        if letter == ' ':
            yield index + 1
```

이 함수의 결과는 리스트가 아닌 `yield` 표현식으로 전달된다. 제너레이터 호출로 반환되는 이터레이터를 내장 함수 list에 전달하면 손쉽게 리스트로 변환할 수 있다.

```python
result = list(index_words_iter(address))
```

`index_words` 함수의 두 번째 문제는 반환하기 전에 모든 결과를 리스트에 저장해야 한다는 점이다. 입력이 매우 많다면 프로그램 실행 중에 메모리가 고갈되어 동작을 멈추는 원인이 된다. 반면에 제너레이터로 작성한 버전은 다양한 길이의 입력에도 쉽게 이용할 수 있다.

다음은 파일에서 입력을 한 번에 한 줄씩 읽어서 한 번에 한 단어씩 출력을 내어주는 제너레이터이다. 이 함수가 동작할 때 사용하는 메모리는 입력 한 줄의 최대 길이까지다.

```python
def index_file(handle):
    offset = 0
    for line in handle:
        if line:
            yield offset
        for letter in line:
            offset += 1
            if letter == ' ':
                yield offset

with open('/tmp/address.txt', 'r') as f:
    it = index_file(f)
    results = islice(it, 0, 3) #인덱스 0부터 3까지 it을 슬라이싱
    print(list(results))
```

```
[0, 5, 11]
```

<br/>

## 인수를 순회할 때는 방어적으로 하자

예를 들어 미국 텍사스주의 여행자를 수를 분석하고 싶다고 하자. 데이터 집합은 각 도시의 방문자 수이고, 결과 값은 각 도시의 방문자 수를 전체 방문자 수로 나누어 각 도시가 전체에서 차지하는 비중을 알아내어 반환한다.

```python
def normalize(numbers):
    total = sum(numbers)
    result = []
    for value in numbers:
        percent = 100 * value / total
        result.append(percent)
    return result

def read_visits(data_path):
    with open(data_path) as f:
        for line in f:
            yield int(line)

it = read_visits('/tmp/my_numbers.txt')
percentages = normalize(it)
print(percentages)
```
놀랍게도 제너레이터의 반환 값에 normalize를 호출하면 아무 결과도 생성되지 않는다.

```
>>>
[]
```

이런 결과가 나온 이유는 이터레이터가 결과를 한 번만 생성하기 때문이다. 이미 `StopIteration` 예외를 일으킨 이터레이터나 제너레이터를 순회하면 어떤 결과도 얻을 수 없다.

다음은 이전과 동일하지만 입력 이터레이터를 명시적으로 소진하고 전체 콘텐츠의 복사본을 리스트에 저장하여 방어적으로 복사하는 함수이다.

```python
def normalize_copy(numbers):
    numbers = list(numbers) # 이터레이터 복사
    total = sum(numbers)
    result = []
    for value in numbers:
        percet = 100 * value / total
        result.append(percent)
    return result
```

이제 함수가 제너레이터의 반환 값에도 올바르게 동작한다.

```python
it = read_visits('/tmp/my_numbers.txt')
percentage = normalize_copy(it)
print(percentages)
```

이 방법의 문제는 입력받은 이터레이터 콘텐츠의 복사본이 클 수도 있다는 점이다. 이런 이터레이터를 복사하면 프로그램의 메모리가 고갈되어 동작을 멈출 수도 있다. 이를 위해 이터레이터 프로토콜을 구현한 새 컨테이너 클래스를 제공하는 것은 좋은 방법이 된다.

```python
class ReadVisits(object):
    def __init__(self, data_path):
        self.data_path = data_path
    
    def __iter__(self):
        with open(self.data_path) as f:
            for line in f:
                yield int(line)
```

새로 정의한 컨테이너 타입은 원래의 함수에 수정을 가하지 않고 넘겨도 제대로 동작한다.

```python
visits = ReadVisits(path)
percentages = nomalize(visits)
print(percentages)
```

이 코드가 동작하는 이유는 normalize의 sum 메소드가 새 이터레이터 객체를 할당하려고 `ReadVisits.__iter__`를 호출하기 때문이다. 숫자를 정규화하는 for 루프도 두 번째 이터레이터 객체를 할당할 때 __iter__를 호출한다. 두 이터레이터는 독립적으로 동작하므로 각각의 순회 과정에서 모든 입력 데이터 값을 얻을 수 있다.


## 가변 위치 인수(*args)로 깔끔하게 보이게 하자

단, 제너레이터와 `*` 연산자를 함께 사용하면 튜플이 제너레이터로부터 생성된 모든 값을 담기때문에 메모리를 많이 차지하여 프로그램이 망가질 수 있음을 주의하자.

또한, `*args`를 받는 새 위치 파라미터를 추가하면 정말 찾기 어려운 버그가 생길 수도 있다.

<br/>

## 키워드 인수로 선택적인 동작을 제공하자

키워드 인수의 유연성은 세 가지 중요한 이점이 있다.

1. 코드를 처음 보는 사람이 함수 호출을 더 명확하게 이해할 수 있다
2. 함수를 정의할 때 기본값을 설정할 수 있다
3. 기존의 호출 코드와 호환성을 유지하면서도 함수의 파라미터를 확장할 수 있는 강력한 수단이 된다.

`3`의 예로 킬로그램 단위는 물론 무게 단위로도 유속을 계산하려고 함수를 확장하고자 할때, 다음과 같이 처리할 수 있다.

```python
def flow_rate(weight_diff, time_diff, period=1, units_per_kg=1):
    return ((weight_diff / units_per_kg) / time_diff * period)
```

## 동적 기본 인수를 지정하려면 None과 docstring을 사용하자

파이썬에서 결과가 기대한 대로 나오게 하려면 기본값을 `None`으로 설정하고 `docstring(문서화 문자열)`으로 실제 동작을 문서화하는 게 관례다. 코드에서 인수 값으로 `None`이 나타나면 알맞은 기본값을 할당하면 된다.

```python
def log(message, when=None):
    """Log a message with a timestamp.

    Args:
        message: Message to print.
        when: datetime of wehn the message occurred.
            Defaults to the present time.
    """

    when = datetime.now() if when is None else when
    print('%s: %s' % (when, message))
```

## 키워드 전용 인수로 명료성을 강요하자

파이썬 3에서는 `키워드 전용 인수(keyword-only argument)`로 함수를 정의해서 의도를 명확히 드러내도록 요구할 수 있다.

다음은 키워드 전용 인수로 `safe_division`함수를 정의하였다. 인수 리스트에 있는 `*`기호는 위치 인수의 끝과, 키워드 전용 인수의 시작을 가리킨다.

```python
def safe_division(number, divisor, *, ignore_overflow=False, ignore_zero_division=False)
```