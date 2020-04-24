USE [MapaBasico1]
GO

/****** Object:  Table [dbo].[persona]    Script Date: 07/09/2017 01:38:07 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[persona](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
	[apellido] [varchar](50) NULL,
	[edad] [int] NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


