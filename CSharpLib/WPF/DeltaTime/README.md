# DeltaTime

```xaml
<Window x:Class="MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800">
    <Grid>
        <Ellipse x:Name="Circle"
                 Width="64" Height="64"
                 HorizontalAlignment="Left"
                 VerticalAlignment="Top"
                 Margin="100, 100, 0, 0"
                 RenderTransformOrigin="0.5, 0.5"
                 MouseDown="OnCircle">
            <Ellipse.Fill>
                <SolidColorBrush Color="#0000ff"/>
            </Ellipse.Fill>
        </Ellipse>
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

    public void OnCircle(object sender, EventArgs args)
    {
        CompositionTarget.Rendering += (sender, e) =>
        {
            var left = Circle.Margin.Left + DeltaTime.Current * 50d;
            Circle.Margin = new Thickness(left, Circle.Margin.Top, 0d, 0d);
        };
    }
}
```

![deltaTime](https://user-images.githubusercontent.com/127966719/227904664-b336b590-9faa-4971-a05a-727a4f7da560.gif)
