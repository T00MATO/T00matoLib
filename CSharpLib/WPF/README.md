#

```xaml
<Window x:Class="MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800">
    <Grid>
        <Rectangle x:Name="Rect1"
                   Width="64" Height="64"
                   HorizontalAlignment="Left"
                   VerticalAlignment="Top"
                   Margin="100, 100"
                   RenderTransformOrigin="0.5, 0.5"
                   MouseDown="OnRect">
            <Rectangle.Fill>
                <SolidColorBrush Color="#ff0000"/>
            </Rectangle.Fill>
            <Rectangle.RenderTransform>
                <TransformGroup>
                    <RotateTransform x:Name="RectRotate" Angle="0"/>
                </TransformGroup>
            </Rectangle.RenderTransform>
        </Rectangle>
    </Grid>
</Window>
```

```csharp
public partial class MainWindow : Window
{
    private static Point _startPoint = new Point(100d, 100d);
    private static Point _endPoint = new Point(400d, 200d);

    private static double _startAngle = 0d;
    private static double _endAngle = 180d;

    public MainWindow()
    {
        InitializeComponent();
    }

    private void OnRect(object sender, EventArgs args)
    {
        Coroutine.Start(IERectAnim());
    }

    private IEnumerator IERectAnim()
    {
        yield return new WaitForSeconds(1.5d);

        var startTime = DateTime.Now;
        var duration = TimeSpan.FromSeconds(1.5d);

        TimeSpan elapsed;

        do
        {
            elapsed = DateTime.Now - startTime;
            if (elapsed > duration)
                elapsed = duration;

            var ratio = elapsed / duration;

            var currentPoint = _startPoint + (_endPoint - _startPoint) * ratio;
            Rect1.Margin = new Thickness(currentPoint.X, currentPoint.Y, 0d, 0d);

            var currentAngle = _startAngle + (_endAngle - _startAngle) * ratio;
            RectRotate.Angle = currentAngle;

            yield return new WaitForNextFrame();
        }
        while (elapsed < duration);
    }
}
```

![coroutine](https://user-images.githubusercontent.com/127966719/227890145-1094373f-220d-43df-962f-9adedeeabd44.gif)
