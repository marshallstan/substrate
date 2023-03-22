trait Area {
    fn area(&self) -> f64;
}

struct Circle {
    radius: f64,
}

impl Area for Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }
}

struct Triangle {
    base: f64,
    height: f64,
}

impl Area for Triangle {
    fn area(&self) -> f64 {
        0.5 * self.base * self.height
    }
}

struct Square {
    side: f64,
}

impl Area for Square {
    fn area(&self) -> f64 {
        self.side * self.side
    }
}

fn print_area<T: Area>(area_type: &str, shape: T) {
    println!("The area of the {} is {}", area_type, shape.area());
}

fn main() {
    let circle = Circle { radius: 2.0 };
    print_area("circle", circle);

    let triangle = Triangle { base: 3.0, height: 4.0 };
    print_area("triangle", triangle);

    let square = Square { side: 5.0 };
    print_area("square", square);
}
