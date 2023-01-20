# Best practices

- ## Websides recommendation

    - [Polish](https://bykowski.pl)
    - [English](https://www.baeldung.com)

- ## Java naming convention

  > There are only two hard things in Computer Science: cache invalidation and naming things.

W Javie jest stosowane podejście **Camel Case**, a szczególnie jego odmiany:

- **Lower Camel Case** — stosowany jest do pól, zmiennych lokalnych, argumentów metod oraz metod, na przykład:

  ```java
  private void myMethodInLowerCamelCase(String myMethodArgument);
  private int articlesCount;
  protected Integer count;
  ```

- **Upper Camel Case** — stosowany jest do klas, interfejsów, adnotacji, enum, rekordów, na przykład:

  ```java
  class NgoDataFromKrs {...
  }
  
  interface SerializableEntity {...
  }
  
  record Comment {...
  }
  
  @interface PropertyValue {...
  }
  ```

- **Screaming Snake Case** -- stosowany do stałych, na przykład:

  ```java
  private final char[]ACCEPTABLE_SYMBOLS;
  protected int COUNT_TO_RESET;
  ```

- **Lower Dot Case** -- stosowany do packages oraz plików property, na przykład:

  ```java
  package pl.com.ttsw.habitatserver.entity;
  application.properties
          message.properties
  
  ```

#### Nieporwane nazewnictwo z mieszaniem stylów (oraz dodatkowo zbędna nazwa pola klasy):

  ```java
  Optional<List<BusinessOffer>>findAllByBusiness_BusinessId(Long id);
  ```

#### Poprawnie:

  ```java
  Optional<List<BusinessOffer>>findAllByBusinessId(Long id);
  ```

- #### Nazwa interfejsu, za możliwośći, powinna być imiesłowem, na przykład:

> Appendable \
> Cloneable \
> Iterable \
> Runnable

- #### Nazwa metody, która zwraca wartość boolowską, powinna mieć prefiks **`is`**, `has`, lub `can` (jeśli niema sprzeczności ze zdrowym rozsądkiem), na przykład:

  ```java
  boolean isAccessAllowed(...)
  ```

  ```java
  boolean canRepalce(...) 
  ```

  ```java
  boolean hasAuthority(...)
  ```

- ### Zawsze korzystać z {} dla if else, dla zmniejszenia prawdopodobieństwa wystąpienia błędów:
  ```java
  if (isActive)
   return true; 
  ```
  ```java
  if (isActive){
    return true;
  }
  ```


- ### W InteliJIDEA po prawej stronie znajduję się pionowa linia. Służy ona do kontroli długości linijek kodu. (Oracle nie zaleca pisanie linij kodu dłuższych od 80 symboli). Nie pisać linijek, które przekraczają daną linię.
  Metoda ciężka do przeczytania:
  ```java 
  emailService.sendHtmlEmail(email, messageSource.getMessage("email.message.subject.activation.account", null, Locale.getDefault()), messageSource.getMessage("email.message.activation.account.before.token", null, Locale.getDefault()) + aut.getConfirmationId() + messageSource.getMessage("email.message.activation.account.after.token", null, Locale.getDefault()));
  ```
  Metoda spoko:
  ```java 
  emailService.sendHtmlEmail(email,
                             messageSource.getMessage("email.message.subject.activation.account", null, Locale.getDefault()),
                             messageSource.getMessage("email.message.activation.account.before.token", null, Locale.getDefault()) +
                               aut.getConfirmationId() + 
                                messageSource.getMessage("email.message.activation.account.after.token", null, Locale.getDefault()));
  ```

- ### Korzystać z autoformat w Inelij -  `ctrl` + `alt` + `L`

[Link do strony Oracle dla zapoznania się ze szczegółami](https://www.oracle.com/java/technologies/javase/codeconventions-introduction.html)

- ### Metody, które mogą zwrócić `null`, zalecane jest owijać w obiekt `Optional`.

  ```
  Optional<String> myMethod (...) { return Optional.ofNullable(nullPosibleArgument);}
  ```

- ### Jeśli metoda zwraca Optional, przed pobieraniem wartości metodą `get()`, sprawdzać, czy wartość jest przedstawiona `isPresent()`, albo korzystać z innych bezpiecznych metod ( `orElse`, `orElseThrow`). Pobieranie wartości bez sprawdzania, robi użycie `Optional` bezsensownym.
- ### Dla metod które zwracają kolekcje elementów, jeśli kolekcja nie zawiera elemetów — zamiast `null` zwracać pustą kolekcję.
- ### Przy definiowaniu zmiennych lokalnych oraz pól, zalecane jest korzystanie z polimorfizmu, jeśli jest taka możliwość:
  ```java
  List<User> usersList = new ArrayList<>(); 
  Iterable<Category> cat = new HashSet<>();
  ```
- ### Dla typów generycznych, koniecznie stosować generyki. Parametryzować kolekcje typem, który będzie tam przechowywany.

- ### Przy definiowaniu pól oraz metod klasy, korzystać z enkapsulacji. Domyślnie przyjmować wszystkie pola jako prywatne. Nie udostępniać stanu obiektu na wprost, bez metod `get()`, `set()`. Udostępniać tylko te metody, które będą publicznym kontraktem danej klasy (API)

## Spring best practices

- Spring nie zaleca stosować `checked` wyjątków. Spring dostarcza narzędzia, dla centralizowanego przechwytywania
  wyjątków w `Runtime`, za pomocą `@ControllerAdvice` oraz `@ExeptionHandler`. Logikę po przechwytywaniu umieszczamy w
  globalnym handlerze.
- Serwisy odznaczamy adnotacją `@Service` zamiast `@Component`, choć faktycznie nie ma różnicy.

### Dependecy injection

- Spring umożliwia wstrzykiwanie zależności na trzy sposoby:
- `Fiel injection`,
- `Setter injection`,
- `Constructor injection`. \
  Zalecane jest stosowanie wstrzykiwania zależności przez konstruktor. Nie zaleca się stosowanie `Field injection`

### SpringBoot

- Wszystkie wartości konfiguracyjne, które mogą się zmieniać, umieszczamy w pliku `application.properties`. W klasach
  wstrzykujemy wartości za pomocą adnotacji @Value.

**applications.property**

> jwt.secret=secret

**W klasie:**
> @Value("jwt.sercret")\
> private String secret;

Pozwoli to w zależności od `runtime environment` zmieniać wartości, bez ponownej kompilacji projektu.

### Spring JPA

- Spring JPA umożliwia wykonywanie zapytań do bazy danych na trzy sposoby:
- [Query Method Names](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation)
  ,
- JPQL,
- Native SQL. \
  Zaleca się wykorzystywać dbms-independent rozwiązania w pierwszej kolejności. Dla prostych zapytań korzystać z **Query
  method names**. Jeśli nie di się — korzystamy z **JPQL**, inaczej — z **Native query**.
- Unikać nazw kolumn, zawierających nazwę tabeli.\
  Bad practice:

> table **User**\
> user_id\
> user_phone\
> user_password\

```java
User findByUserUserPhone(long id){}
```

W podany powyżej sposób, są nazywane klucze obce w tabelach.

Good practice:

  > table **User** \
  > id \
  > phone \
  > password

```java
User findByUserPhone(long id){}
```

- Wykonywać operacje po filtrowaniu, wyszukiwaniu oraz sortowaniu rekordów na stronie bazy danych, nie na stronie JVM:
    - **Na stronie JVM:**
  > feedbackRepository.findAll().stream().filter(f-&gt; f.getBusiness().isHidden());
    - Potencjalnie duża kolekcja (1_000_000 a może 2M) pobierana do pamięci JVM, potem filtrowana

    - **Na stronie DB:**
  > feedbackRepository.findAllByBusinessIsHidden(boolean isHidden);
    - Do JVM ładowany wynnik SQL zapytania zgenerowanego JPA.

### Spring Security

- Przy autoryzacji zapytań do kontrolerów, korzystać z `@Pre`/`@PostAuthorize` oraz `SpEL`
  zamiast implementowania logiki autoryzacji w serwisach.

## REST API conventions and best practices

- ### Zasoby, które są kolekcjami, nazywamy rzeczownikiem w liczbie mnogiej
  > /categories/34/articles/35
- ### Zasoby, które są pojedyncze, nazywamy rzeczownikiem w liczbie pojedynczej
  > /users/34/avatar \
  > /projects/4/contract
- ### Zasoby, które składają się z kilku słów, rozdzielamy łącznikiem
  > /business-offers/3 \
  > /main-projects/5
- ### Nie używamy czasowników w URI. Jest to RPC styl, nie RESTful
  > /business-offers/get-all \
  > /projects/5/delete \
  > /needs/all \
  > /user/activate
- ### Dla wszystkich endpointów, które zwracają kolekcje, niezbędnym jest ograniczenie ilości danych, zapytywanych w jednym zapytaniu (Spring `Pageable`)
  > GET /business-offers?size=10&page=1 \
  > /projects?size=5 (default 10, max 40 na przykład)
    - Nie pozwalać klientom API (frontend) w jednym zapytaniu wyciągać wszystkie rekordy z bazy na raz (co jak projektów
      będzie 1_000_000, oraz 1000 użytkowników będzie przeglądać projekty ?)

- ### Dla wszystkich endpointów, które zwracają obiekty, które mają zagnieżdżone obiekty lub listy obiektów, udostępniać możliwość wyboru dla frontu sposobu pobierania takiego obiektu : tylko sam obiekt z `null` lub z zagnieżdżonymi obiektami:
  Wraz z zagnieżdżoną kolekcją:
  > GET /business-offer/334?expand=true \
  > respose:
  > ```json 
    > {
    > "id":"334",
    > "title":"myoffer",
    > ...
    > "items" : { "id": "1",
    >             "title": "new title"},
    >             {"id": "2",
    >             "title": "new title2"},
    >             ... other 1000 nested items
    > }
    > ```

  Tylko sam object:
  > GET /business-offer/334 \
  > respose:
  > ```json 
    > {
    > "id":"334",
    > "title":"myoffer",
    > ...
    > "items" : "null"
    > ```

## [Link do zapoznania się ze szczegółami](https://restfulapi.net/resource-naming/)

- ## GET
- #### HTTP metoda `GET` stosowana tylko do pobierania zasobów. `GET` jest jedną z `safe methods` - metody które nie powinni zmieniać stanu zasobu na serwerze.
- #### GET zwraca:
    - `200 OK` oraz body
    - `404 NOT FOUND` jeśli zasób z takim id nie istnieje
    - `400 BAD REQUEST` jeśli przekazane request parametry są niepoprawne
- #### Identyfikator zasobu przekazywany w ścieżce URI, (Spring `@PathVariable`)
  > HTTP GET http://www.domain.com/users/123
- #### Jeśli potrzebna jest inna reprezentacja zasobu (filtrowanie, sortowanie itd.), stosowane są `http request parameters` (Spring `@RequestParam`)
  > HTTP GET http://www.domain.com/users?status=activated
  >
  > HTTP GET http://www.domain.com/users?size=20&page=5&sort=name,asc&status=accepted


- ## POST
- #### HTTP metoda `POST` stosowana do tworzenia zasobów. `POST` jest jedną z `unsafe methods` - metody, które zmieniają stan zasobu na serwerze.
- #### POST zwraca:
    - `201 CREATED` oraz zasób który był stworzony
    - `200 OK` jeśli dokonane zmiany nie mogą być przedstawione w postaci zasobu.

Na przykład dodanie nowego artykułu do kategorii:

> POST /categories/2/articles

```json
{
  "title": "How to",
  "desc": "New desc"
}
```

- #### Zwrócony zasób powinien zawierać identyfikator. W taki sposób frontend nie musi wysyłać osobnego zapytania, żeby dowiedzieć się URI nowo utworzonego zasobu.

- ## PUT
- #### HTTP metoda `PUT` stosowana do modyfikowania już istniejącego zasobu. `PUT` jest jedną z `unsafe methods`.
- #### PUT zwraca:
    - `200 OK` oraz puste body, jeśli zmiany zostały zaakceptowane
    - `400 BAD REQUEST` jeśli wysłane zapytanie jest niepoprawne i nie może być zaakceptowane
- #### Dana metoda przewiduje wysyłanie w zapytaniu wszystkich pól encji — zmienionych, jak i niezmienionych.

- ## DELETE
- #### HTTP metoda `DELTE` stosowana do usuwania istniejącego zasobu. `DELETE` jest jedną z `unsafe methods`.
- #### DELETE zwraca:
    - `200 OK` oraz zasób który został usunięty
    - `204 No Content` jeśli zasób został usunięty, ale odpowiedź jest pusta
    - `404 Not Found` jeśli zapytanie wysłane ponownie dla tego samego URI

## [Link do zapoznania się ze szczegółami](https://restfulapi.net/)

### Mapstruct

- Dla mapowania kolekcji, zamiast

```
response = itemService.findAll().stream().map(itemMappper::mapToDto).Collectors(Collector.toList());
````

Używamy mappera

```java
response=itemMapper.mapToDto(itemService.findAll());
```

W mapperze dodajemy metodę:

```aidl
List<ItemDto> mapToDto (List<Item> items);
```

## [Three Layer Architecture](https://www.ibm.com/pl-pl/cloud/learn/three-tier-architecture)

- #### W ramach architektury trójwarstwowej, aplikacja podzielona jest na 3 warstwy:
- warstwa prezentacji, za którą odpowiadają kontrolery (Spring `@RestController` )
- warstwa biznesowa, za którą odpowiadają serwisy (Spring `@Service`)
- warstwa danych, za którą odpowiada Spring JPA (Spring `@Entity`, `@Repository`)
- #### Kontrolery odpowiadają za routing, przyjmowanie requestów od frontu oraz zwracanie odpowiedzi http z wynikiem przygotowanym przez serwisy.
- #### Kontrolery przekazują zwalidowane requesty do serwisów, wywołując odpowiednie metody serwisów
- #### Serwisy wykonują procesowanie requestów(biznes logika), wywołują inne serwisy lub metody z warstwy danych oraz zwracają wynik
- #### Warstwa danych reprezentowana przez `@Repository` zwraca dane z bazy danych w postaci entity lub views.
- #### Kontrolery powiązane tylko z serwisami -> serwisy tylko z warstwą persistance lub innymi serwisami -> warstwa persistance nie jest powiązana z żadną z powyższych warstw
