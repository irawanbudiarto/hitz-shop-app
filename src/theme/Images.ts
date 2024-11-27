interface AssetType {
  Iera: any
  Background: any
}

export default function (): AssetType {
  return {
    Iera: require('./assets/images/iera.png'),
    Background: require('./assets/images/background.jpg'),
  }
}
