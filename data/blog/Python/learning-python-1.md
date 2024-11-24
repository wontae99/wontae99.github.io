---
title: 📖파이썬 코딩의 기술#1 - 파이썬 다운 생각
date: '2023-12-18'
tags: ['Python']
draft: false
summary: 파이썬 코딩의 기술 읽고 파이썬 공부하기 🐍
---


# 파이썬 답게 생각하기

## PEP 8 스타일 가이드를 따르자

파이썬 개선 제안서(Python Enhancement Proposal) #8, 즉 PEP 8은 파이썬 코드를 어떻게 구성할지 알려주는 스타일 가이드이다. 문법만 잘 지킨다면 어떻게 파이썬 코드를 작성해도 괜찮지만, 코드의 일관성은 유지보수를 용이하게 하고 가독성도 높일 수 있다. 또한, 다른 파이썬 프로그래머들과 공통된 스타일을 공유하면 다양한 프로젝트에서도 협업이 가능하다. PEP 8은 파이썬 코드를 명확하게 작성하는 방법이 자세히 나와 있다. 반드시 따라야 하는 몇 가지 규칙은 다음과 같다.

- 화이트 스페이스 / 공백(white space)
  - 탭이 아닌 스페이스로 들여씀
  - 문법적으로 의미 있는 들여쓰기는 각 수준마다 스페이스 네 개를 사용
  - 한 줄의 문자 길이가 79자 이하로
  - 표현식이 길어서 다음 줄로 이어지면 일반적인 들여쓰기 수준에 추가로 스페이스 네 개를 사용
  - 파일에서 함수와 클래스는 빈 줄 두 개로 구분
  - 클래스에서 메서드는 빈 줄 하나로 구분
  - 리스트 인덱스, 함수 호출, 키워드 인수 할당에는 스페이스바 사용 x
  - 변수 할당 앞뒤에 스페이스를 하나만 사용

- 명명(naming) : 
  - 함수, 변수, 속성은 lowercase_underscore 형식을 따름
  - 보호(protected) 인스턴스 속성은 _leading_underscroe 형식을 따름
  - 비공개(private) 인스턴스 속성은 __double_leading_underscore 형식을 따름
  - 클래스와 예외는 CapitalizedWord 형식을 따름
  - 모듈 수준 상수는 ALL_CAPS 형식을 따름
  - 클래스의 인스턴스 메서드에서 첫 번째 파마리터의 이름을 self로 지정
  - 클래스 메서드에서 첫 번째 파라미터(해당 클래스를 참조)의 이름을 cls로 지정


- 표현식과 문장 : 파이썬 계명(The Zen of Python)에는 "어떤 일을 하는 확실한 방법이 (될 수 있으면 하나만) 있어야 한다."는 표현이 있다. PEP 8은 표현식과 문장의 본보기로 이 스타일을 정리
  - 긍정 표현식의 부정(`if not a is b`) 대신 인라인 부정 (`if a is not b`)를 사용
  - 길이의 확인(`if len(someList) == 0`)하여 빈 값([] 또는 '')를 확인하지 않음. `if not someList`를 사용하고, 빈 값은 암시적으로 `False`가 된다고 가정
  - 마찬가지로 비어 있지 않은 값에도 위와 같은 방식이 적용. 값이 비어 있지 않으면 `if someList` 문이 암시적으로 `True`가 됨
  - 한 줄로 된 if 문, for와 while 루프, except 복합문을 쓰지 않는다. 이런 문장은 여러 줄로 나눠 명료하게 작성
  - 항상 파일 맨위에 `import` 문 작성
  - 상대적인 임포트를 해야 한다면 명시적인 구문을 써서 `from . import foo`라고 함
  - 임포트는 `표준 라이브러리 모듈` -> `서드 파티 모듈` -> `자신이 만든 모듈` 섹션 순으로 구분해야 함. 각각 하위 섹션에서는 알파벳 순서로 임포트
  
<br/>

## 복잡한 표현식 대신 헬퍼 함수를 작성

파이썬에의 간결한 문법을 이용하면 많은 로직을 표현식 한 줄로 쉽게 작성할 수 있다. 하지만, 무조건 짧은 코드를 만들기 보다는 가독성을 선택하는 편이 낫다. 복잡한 표현식은 헬퍼 함수로 옮기는 게 좋다. 특히, 같은 로직을 반복해서 사용해야 한다면 헬퍼 함수를 사용하자.

<br/>

## 시퀀스를 슬라이스하는 방법을 알자

파이썬 시퀀스 슬라이스를 통해 시퀀스 아이템의 서브셋에 접근할 수 있다. 가장 간단한 슬라이싱 대상은 `list`, `str`, `bytes`이다.
슬라이싱 문법의 기본 형태는 somelist[start:end] 이며, 여기서 start 인덱스는 포함되고 end 인덱스는 제외된다.

__예시__

```python
a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
print('First Four: ', a[:4])
print('Last four: ', a[-4:])
print('Middle two: ', a[3:-3])
```

list 슬라이스에 할당하면 원본 시퀀스에 지정한 범위를 참조 대상의 내용으로 대체한다. (길이가 달라도 동작한다.)
```python
print('Before ', a)
a[2:7] = [99, 22, 14]
print('After', a)
```

```
>>>
Before ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
After ['a', 'b', 99, 22, 14, 'h']
```

한 슬라이스에 start, end, stride를 지정하면 매우 혼란스러울 수 있다. 슬라이스에 start와 end인덱스 없이 양수 stride 값을 사용하자. 음수 stride 값은 가능하면 피할 것.

<br/>

## map과 filter 대신 리스트 컴프리헨션을 사용하자

리스트 컴프리헨션으로 한 리스트에서 다른 리스트로 간결하게 만들 수 있다. 딕셔너리와 세트에도 리스트 컴프리헨션 표현식을 지원한다. 컴프리헨션 문법을 쓰면 알고리즘을 작성할 때 파생되는 자료 구조를 쉽게 생성할 수 있다.

```python
squares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
even_squares = [x**2 for x in a if x % 2 == 0]
print(even_squares)
```
```
>>>
[4, 16, 36, 64, 100]
```

단, 리스트 컴프리헨션에서 표현식을 두 개 넘게 쓰지 말자! 조건 두 개, 루프 두 개, 혹은 조건 한 개와 루프 한 개로 대체하고, 그보다 더 복잡해 진다면 일반적인 if문과 for 문을 사용하고 헬퍼 함수를 작성하자.

<br/>

## 컴프리헨션이 클 때는 제너레이터 표현식을 고려하자

리스트 컴프리헨션의 문제점은 입력 시퀀스에 있는 각 값별로 아이템을 하나씩 담은 새 리스트를 통째로 생성한다는 점이다. 따라서 입력이 커지게 되면, 메모리를 많이 소모하여 프로그램을 망가뜨리는 원인이 되기도 한다.

파이썬은 이 문제를 해결하려고 리스트 컴프리헨션과 제너레이터를 일반화한 제너레이터 표현식을 제공한다. 제너레이터 표현식은 실행될 때 출력 시퀀스를 모두 구체화(메모리에 로딩) 하지 않고 한 번에 한 아이템을 내주는 이터레이터로 평가 된다.

__예 시__

```python
value = [len(x) for x in open('/tmp/my_file.txt')]
```
대신
```python
it = (len(x) for x in open('/tmp/my_file.txt'))
print(it)
```
```
>>>
<generator object <genexpr> at 0x101b81480>
```
처럼 사용한다면 메모리 사용량을 걱정하지 않을 수 있다. 이처럼 큰 입력 스트림에 동작하는 기능을 결합하는 방법을 찾을 때는 제너레이터 표현식이 최선의 도구다. 단, 제너레이터 표현식이 반환한 이터레이터에는 상태가 있으므로 이터레이터를 한 번 넘게 사용하지 않도록 주의하자.

<br/>

## range 보다는 enumerate를 사용하자.

내장 함수 `range`는 정수 집합을 순회(iterate)하는 루프를 실행할 때 유용하다. 문자열의 리스트 같은 순회할 자료 구조가 있을 때는 직접 루프를 실행할 수 있다. 그리고 다음과 같이 종종 리스트를 순회하거나 리스트의 현재 아이템의 인덱스를 알고 싶은 경우가 있다.

__예 시__

```python
for i in range(len(flavor_list)):
    flavor = flavor_list[i]
    print('%d: %s' %  (i + 1, flavor))
```

위의 코드는 리스트의 길이를 알아내야 하고, 배열을 인덱스로 접근해야 하기 때문에 읽기 불편하다.
파이썬은 이런 상황을 처리하려고 내장 함수 `enumerate`를 제공한다. `enumerate`는 지연 제너레이터(lazy generator)로 이터레이터를 감싼다.
이 제너레이터는 이터레이터에서 루프 인덱스와 다음 값을 한 쌍으로 가져와 넘겨준다.

__예 시__

```python
for i, flavor in enumerate(flavor_list):
    print('%d: %s' %  (i + 1, flavor))
```

또한 다음과 같이 `enumerate`로 세기 시작할 숫자를 지정할 수 있다.

```python
for i, flavor in enumerate(flavor_list, 1):
    print('%d: %s' %  (i , flavor))
```

<br/>

## 이터레이터를 병렬로 처리하려면 zip을 사용하자

파이썬에서 리스트 컴프리헨션을 사용하면 소스 리스트에 표현식을 적용하여 파생 리스트를 쉽게 얻을 수 있다. 파생 리스트의 아이템과 소스 리스트의 아이템은 인덱스로 연관되어 있기 때문에, 두 리스트를 병렬로 순회하려면 소스 리스트의 길이만큼 순회하면 된다.

__예 시__

```python
names = ['Saliba', 'Saka', 'Hervertz']
letters = [len(n) for n in names]
longest_name = None
max_letters = 0

for i, name in enumerate(names):
    count = letters[i]
    if count > max_letters:
        longest_name = name
        max_letters = count
```

파이썬은 위의 코드를 좀 더 명료하게 하는 내장 함수 zip을 제공한다. 파이썬 3에서 지연 제너레이터로 이터레이터 두 개 이상을 감싼다. zip 제너레이터는 각 이터레이터로부터 다음 값을 담은 튜플을 얻어온다.

```python
for name, count in zip(names, letter):
    if count > max_letters:
        longest_name = name
        max_letters = count
```

문제는 입력 이터레이터들의 길이가 다르면 zip이 이상하게 동작한다는 점이다. 이 방식은 이터레이터들의 길이가 같을 때 제대로 동작하지만, `zip`으로 실행할 리스트의 길이가 같다고 확신할 수 없다면 대신 내장 모듈 `itertools`의 `zip_longest`를 사용하는 방안을 고려해보자.

<br/>

## for과 while 루프 뒤에는 else 블록을 쓰지 말자

파이썬은 루프에서 반복되는 내부 블록 바로 다음에 `else`블록을 둘 수 있다. 파이썬에서 else, except, finally 개념을 처음 접하는 프로그래머들은 for/else의 else 부분이 '루프가 완료되지 않는다면 이 블록을 실행한다'는 의미라고 짐작할 것이다. 하지만 실제로는, 루프에서 `break`문을 사용해야 `else`블록을 건너뛸 수 있다.

```python
for i in range(3):
    print('Loop %d' % i)
    if i == 1:
        break

else:
    print('Else block!')
```

```
>>>
Loop 0 
Loop 1
```

또한 else 블록은 while 루프가 처음부터 거짓인 경우에도 실행된다.
이렇게 동작하는 이유는 루프 다음에 오는 else 블록은 루프로 뭔가를 검색할 때 유용하기 때문이다. 루프 뒤에 else블록을 사용하면 직관적이지 않고 혼동하기 쉬우니 헬퍼 함수를 작성하는 것이 좋다.

헬퍼 함수를 작성하는 첫 번째 방법은 찾으려는 조건을 찾았을 때 바로 반환하는 것이다. 루프가 실패로 끝나면 기본 결과(`True`)를 반환한다.

```python
def coprime(a, b):
    for i in range(2, min(a, b) + 1):
        if a % i == 0 and b % i == 0:
            return False
    return True
```

두 번째 방법은 루프에서 찾으려는 대상을 찾았는지 알려주는 결과 변수를 사용하는 것이다. 뭔가를 찾았다면 즉시 `break`로 루프를 중단한다.

```python
def coprime2(a, b):
    is_coprime = True
    for i in range(2, min(a, b) + 1):
        if a % i == 0 and b % i == 0:
            is_coprime = False
            break
    return is_coprime
```

<br/>

## try/except/else/finally 에서 각 블록의 장점을 이용하자.

파이썬에서 예외 처리 과정에서 동작을 넣을 수 있는 네번의 구분되는 시점이 있다. `try`, `except`, `else`, `finally` 블록 기능으로 각 시점을 처리한다.

- `finally` 블록

예외를 전달하고 싶지만, 예외가 발생해도 정리 코드를 실행하고 싶을 때, try/finally를 사용하면 된다.

<br/>

- `else` 블록

코드에서 어떤 예외를 처리하고 어떤 예외를 전달할지를 명확하게 하려면 try/except/else를 사용해야 한다. try 블록이 예외를 일으키지 않으면 else 블록이 실행된다. else 블록을 사용하면 try 블록의 코드를 최소로 줄이고 가독성을 높일 수 있다.

__예 시__

```python
def load_json_key(data, key):
    try:
        result_dict = json.loads(data)  # ValueError가 일어날 수 있음
    except ValueError as e:  # try에서 에러 발생 시 ValueError를
        raise KeyError from e  # else에서 에러 발생시 KeyError를 raise
    else:
        return result_dict[key]  # KeyError가 일어날 수 있음
```

데이터가 올바른 JSON이 아니라면 json.loads로 디코드할 때 ValueError가 일어난다. 이 예외(exception)은 except 블록에서 발견되어 처리된다.
디코딩이 성공하면 else 블록에서 키를 찾는다. 키를 찾을 때 어떤 예외가 일어나면 그 예외는 try 블록 밖에 있으므로 호출 코드까지 전달된다.
