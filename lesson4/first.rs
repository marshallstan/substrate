fn main() {
    let light = TrafficLight::Green;
    println!("light is: {}", light.duration());
}

enum TrafficLight {
    Red,
    Green,
    Yellow,
}

trait Duration {
    fn duration(&self) -> u8;
}

impl Duration for TrafficLight {
    fn duration(&self) -> u8 {
        match *self {
            TrafficLight::Red => 30,
            TrafficLight::Green => 50,
            TrafficLight::Yellow => 10,
        }
    }
}
